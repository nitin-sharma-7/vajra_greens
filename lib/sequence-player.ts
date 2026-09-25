export type SequenceSpec = {
  path: string;
  frameCount: number;
  width: number;
  height: number;
};

/** A bounded, direction-aware decoder. Scroll callbacks never decode or draw. */
export class SequencePlayer {
  private readonly context: CanvasRenderingContext2D;
  private readonly cache = new Map<number, ImageBitmap>();
  private readonly pending = new Map<number, AbortController>();
  private readonly failures = new Map<number, number>();
  private readonly anchors: number[];
  private readonly capacity: number;
  private queue: number[] = [];
  private target = 0;
  private progress = 0;
  private painted = -1;
  private renderedPair = '';
  private drawn = -1;
  private direction = 1;
  private active = false;
  private disposed = false;
  private paintRequest = 0;
  private resizeObserver: ResizeObserver;

  constructor(private canvas: HTMLCanvasElement, private spec: SequenceSpec) {
    const context = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!context) throw new Error("Canvas rendering is unavailable");
    this.context = context;
    this.capacity = matchMedia("(max-width: 767px)").matches ? 28 : 40;
    this.anchors = [...new Set([0, ...Array.from({ length: Math.ceil(spec.frameCount / 16) }, (_, index) => index * 16), spec.frameCount - 1])];
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.resize();
  }

  seek(progress: number) {
    this.progress = Math.max(0, Math.min(1, progress)) * (this.spec.frameCount - 1);
    const next = Math.round(this.progress);
    if (next === this.target) { this.schedulePaint(); return; }
    this.direction = next > this.target ? 1 : -1;
    this.target = next;
    this.canvas.dataset.targetFrame = String(next);
    if (this.active) this.plan();
    this.schedulePaint();
  }

  setActive(active: boolean) {
    if (active === this.active || this.disposed) return;
    this.active = active;
    if (active) this.plan();
    else {
      this.queue = [];
      for (const controller of this.pending.values()) controller.abort();
      this.pending.clear();
      // The canvas retains its last pixels, so decoded images can be released.
      for (const bitmap of this.cache.values()) bitmap.close();
      this.cache.clear();
    }
  }

  private plan() {
    const desired = [this.target, this.target + this.direction, this.target + 2 * this.direction, ...this.anchors];
    const ahead = this.capacity - this.anchors.length - 5;
    for (let offset = 1; offset <= ahead; offset++) {
      desired.push(this.target + offset * this.direction);
      if (offset <= 4) desired.push(this.target - offset * this.direction);
    }
    desired.push(...this.anchors);
    this.queue = [...new Set(desired)].filter((frame) => frame >= 0 && frame < this.spec.frameCount
      && !this.cache.has(frame) && !this.pending.has(frame) && (this.failures.get(frame) ?? 0) < 2);
    this.evict();
    this.pump();
  }

  private pump() {
    while (this.active && !this.disposed && this.pending.size < 4 && this.queue.length) {
      const frame = this.queue.shift()!;
      if (this.cache.has(frame) || this.pending.has(frame)) continue;
      const controller = new AbortController();
      this.pending.set(frame, controller);
      void this.decode(frame, controller);
    }
  }

  private async decode(frame: number, controller: AbortController) {
    try {
      const response = await fetch(`${this.spec.path}/${String(frame).padStart(4, "0")}.png`, {
        signal: controller.signal,
        cache: "force-cache",
      });
      if (!response.ok) throw new Error(`Frame ${frame}: ${response.status}`);
      const bitmap = await createImageBitmap(await response.blob());
      if (this.disposed || !this.active || controller.signal.aborted) bitmap.close();
      else {
        this.cache.set(frame, bitmap);
        this.evict();
        this.schedulePaint();
      }
    } catch {
      if (!controller.signal.aborted) this.failures.set(frame, (this.failures.get(frame) ?? 0) + 1);
    } finally {
      if (this.pending.get(frame) === controller) this.pending.delete(frame);
      this.pump();
    }
  }

  private evict() {
    if (this.cache.size <= this.capacity) return;
    const score = (frame: number) => {
      const offset = (frame - this.target) * this.direction;
      return offset < -4 ? 1000 + Math.abs(offset) : Math.abs(offset);
    };
    const candidates = [...this.cache.keys()]
      .filter(frame => frame !== this.target && frame !== this.drawn && !this.anchors.includes(frame))
      .sort((a, b) => score(b) - score(a));
    while (this.cache.size > this.capacity && candidates.length) {
      const frame = candidates.shift()!;
      this.cache.get(frame)?.close();
      this.cache.delete(frame);
    }
  }

  private resize() {
    if (this.disposed) return;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    if (!width || !height) return;
    const ratio = Math.min(devicePixelRatio || 1, 1.5, this.spec.width / width, this.spec.height / height);
    const nextWidth = Math.round(width * ratio);
    const nextHeight = Math.round(height * ratio);
    if (this.canvas.width === nextWidth && this.canvas.height === nextHeight) return;
    this.canvas.width = nextWidth;
    this.canvas.height = nextHeight;
    this.drawn = -1;
    this.painted = -1;
    this.canvas.dataset.ready = "false";
    this.schedulePaint();
  }

  private schedulePaint() {
    if (this.paintRequest || this.disposed) return;
    this.paintRequest = requestAnimationFrame(() => {
      this.paintRequest = 0;
      this.paint();
    });
  }

  private paint() {
    if (this.disposed || !this.cache.size) return;
    const available = [...this.cache.keys()].sort((a, b) => a - b);
    const lower = available.findLast(frame => frame <= this.progress);
    const upper = available.find(frame => frame >= this.progress);
    // Interpolate nearby source images at fractional GSAP positions. If a short
    // network gap exists, interpolation avoids a hold followed by a hard cut.
    const low = lower ?? upper!;
    const high = upper ?? lower!;
    const position = Math.max(low, Math.min(high, this.progress));
    const pair = `${low},${high}`;
    if (position === this.painted && pair === this.renderedPair) return;
    const blend = high === low ? 0 : (position - low) / (high - low);
    this.context.globalAlpha = 1;
    this.draw(this.cache.get(low)!);
    if (blend > 0) {
      this.context.globalAlpha = blend;
      this.draw(this.cache.get(high)!);
      this.context.globalAlpha = 1;
    }
    this.painted = position;
    this.renderedPair = pair;
    this.drawn = Math.round(position);
    this.canvas.dataset.frame = String(this.drawn);
    this.canvas.dataset.position = position.toFixed(3);
    this.canvas.dataset.blendFrames = `${low},${high}`;
    this.canvas.dataset.ready = "true";
    this.canvas.dataset.cacheSize = String(this.cache.size);
    this.canvas.dataset.cacheLimit = String(this.capacity);
  }

  private draw(bitmap: ImageBitmap) {
    const scale = Math.max(this.canvas.width / bitmap.width, this.canvas.height / bitmap.height);
    const width = bitmap.width * scale;
    const height = bitmap.height * scale;
    this.context.drawImage(bitmap, (this.canvas.width - width) / 2, (this.canvas.height - height) / 2, width, height);
  }

  destroy() {
    this.disposed = true;
    this.resizeObserver.disconnect();
    cancelAnimationFrame(this.paintRequest);
    for (const controller of this.pending.values()) controller.abort();
    for (const bitmap of this.cache.values()) bitmap.close();
    this.cache.clear();
    this.queue = [];
  }
}
