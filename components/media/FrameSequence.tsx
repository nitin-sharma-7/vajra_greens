"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { SequencePlayer, type SequenceSpec } from "@/lib/sequence-player";

export type FrameSequenceHandle = { seek: (progress: number) => void };

type Props = {
  sequence: SequenceSpec;
  name: string;
  label: string;
  eager?: boolean;
};

/** Full-resolution source frames; React only manages setup and teardown. */
export const FrameSequence = forwardRef<FrameSequenceHandle, Props>(function FrameSequence(
  { sequence, name, label, eager = false }, ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const player = useRef<SequencePlayer | null>(null);
  const progress = useRef(0);

  useImperativeHandle(ref, () => ({ seek(value) {
    progress.current = value;
    player.current?.seek(value);
  } }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer?.disconnect();
      player.current?.destroy();
      player.current = null;
      canvas.dataset.ready = "false";
      if (preference.matches) return;
      try {
        player.current = new SequencePlayer(canvas, sequence);
        player.current.seek(progress.current);
        if (eager) player.current.setActive(true);
        // Warm the next chapter before it reaches the viewport; release distant frames.
        observer = new IntersectionObserver(([entry]) => player.current?.setActive(entry.isIntersecting), {
          rootMargin: "150% 0px",
        });
        observer.observe(canvas);
      } catch {
        // The source image remains visible if canvas or bitmap decoding is unavailable.
      }
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      preference.removeEventListener("change", setup);
      observer?.disconnect();
      player.current?.destroy();
      player.current = null;
    };
  }, [sequence, eager]);

  return (
    <div className="frame-sequence">
      <img className="sequence-poster" src={`${sequence.path}/0000.png`} alt="" width={sequence.width} height={sequence.height} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "low"} />
      <canvas ref={canvasRef} width={sequence.width} height={sequence.height} className="sequence-canvas" data-sequence={name} data-ready="false" data-target-frame="0" role="img" aria-label={label} />
    </div>
  );
});
