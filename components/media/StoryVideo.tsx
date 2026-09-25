"use client";

import { useEffect, useRef } from "react";

type StoryVideoProps = {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
  label: string;
};

export function StoryVideo({ src, poster, className = "", eager = false, label }: StoryVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduce.matches) video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.12 });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return <video ref={ref} className={className} muted loop playsInline preload={eager ? "auto" : "metadata"} poster={poster} aria-label={label}><source src={src} type="video/mp4" /></video>;
}
