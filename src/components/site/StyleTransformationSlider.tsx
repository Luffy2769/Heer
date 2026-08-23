import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface StyleTransformationSliderProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  leftBadgeLabel?: string;
  rightBadgeLabel?: string;
  className?: string;
}

export function StyleTransformationSlider({
  beforeImg,
  afterImg,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  badge = "INTERACTIVE TRANSFORMATION",
  title = "Real Results, Flawless Finishes",
  subtitle = "Drag the slider to see the dramatic, clean transformational work. From fresh and structured foundations to breathtaking completed looks.",
  leftBadgeLabel = "Base Canvas",
  rightBadgeLabel = "Final Look",
  className = "",
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
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: Text Content */}
        <div className="lg:col-span-6 space-y-6">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-[0.2em]">
              <ImageIcon className="size-3.5 text-accent" />
              <span>{badge}</span>
            </div>
          )}

          {title && (
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
              {subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {leftBadgeLabel && (
              <div className="px-4 py-2 rounded-full bg-secondary/80 border border-border text-xs text-muted-foreground font-medium">
                Left: <span className="text-accent font-bold ml-1">{leftBadgeLabel}</span>
              </div>
            )}
            {rightBadgeLabel && (
              <div className="px-4 py-2 rounded-full bg-secondary/80 border border-border text-xs text-muted-foreground font-medium">
                Right: <span className="text-accent font-bold ml-1">{rightBadgeLabel}</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Reveal Component */}
        <div className="lg:col-span-6 w-full">
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
            className="relative h-[320px] sm:h-[380px] lg:h-[400px] w-full select-none overflow-hidden rounded-2xl border border-border shadow-xl cursor-ew-resize touch-none group"
          >
            {/* AFTER Image (Full Width Background) */}
            <img
              src={afterImg}
              alt={afterLabel}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute bottom-4 right-4 rounded-md bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold tracking-widest text-white uppercase border border-white/10 shadow-md">
              {afterLabel}
            </div>

            {/* BEFORE Image (Clipped) */}
            <div
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              className="absolute inset-0 h-full w-full"
            >
              <img
                src={beforeImg}
                alt={beforeLabel}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-md bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold tracking-widest text-white uppercase border border-white/10 shadow-md">
                {beforeLabel}
              </div>
            </div>

            {/* Slider Divider Bar (Yellow/Accent) */}
            <div
              style={{ left: `${sliderPosition}%` }}
              className="absolute inset-y-0 -translate-x-1/2 w-1 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
            >
              {/* Slider Handle (Yellow Circle with <> icon) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex size-9 sm:size-10 items-center justify-center rounded-full bg-amber-400 text-black shadow-xl border-2 border-yellow-300 hover:scale-105 transition-transform">
                <div className="flex items-center gap-0.5 text-black">
                  <ChevronLeft className="size-3.5 stroke-[3]" />
                  <ChevronRight className="size-3.5 stroke-[3]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


