import { useState, useRef, useEffect } from "react";
import { Sparkles, SlidersHorizontal } from "lucide-react";

interface StyleTransformationSliderProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export function StyleTransformationSlider({
  beforeImg,
  afterImg,
  beforeLabel = "Natural / Prep Look",
  afterLabel = "Bridal Glam Transformation",
  title = "Bridal Transformation",
  subtitle = "Drag the slider to see the hair artistry & makeup perfection",
}: StyleTransformationSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    let pos = (x / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    setSliderPosition(pos);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchend", onMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="space-y-4">
      {title && (
        <div className="text-center space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-3)]">
            <Sparkles className="size-3.5 text-[var(--color-4)]" />
            Interactive Reveal
          </span>
          <h3 className="font-serif text-3xl font-medium text-foreground">{title}</h3>
          <p className="text-xs text-foreground/75 max-w-md mx-auto">{subtitle}</p>
        </div>
      )}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches[0]) handleMove(e.touches[0].clientX);
        }}
        className="relative h-[340px] sm:h-[480px] w-full select-none overflow-hidden rounded-2xl border border-border/80 shadow-xl cursor-ew-resize touch-none"
      >
        {/* AFTER Image (Full Width Background) */}
        <img
          src={afterImg}
          alt={afterLabel}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-black/60 backdrop-blur-md px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-white border border-white/20 shadow-md">
          ✨ {afterLabel}
        </div>

        {/* BEFORE Image (Clipped with inset clipPath so it NEVER resizes or zooms) */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          className="absolute inset-0 h-full w-full"
        >
          <img
            src={beforeImg}
            alt={beforeLabel}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-full bg-black/70 backdrop-blur-md px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-white/95 border border-white/20 whitespace-nowrap shadow-md">
            🌿 {beforeLabel}
          </div>
        </div>

        {/* Slider Divider Bar */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute inset-y-0 -translate-x-1/2 w-1 bg-gradient-to-b from-[var(--color-2)] via-[var(--color-4)] to-[var(--color-2)] shadow-[0_0_12px_rgba(0,230,118,0.6)]"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex size-10 items-center justify-center rounded-full bg-[var(--color-4)] text-white shadow-xl border-2 border-white animate-pulse">
            <SlidersHorizontal className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
