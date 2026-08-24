import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Award, Star, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/motion-bits";

import event from "@/assets/Event.jpg";
import event1 from "@/assets/Event1.jpeg";
import event2 from "@/assets/Event2.jpeg";

const slides = [
  {
    id: 1,
    image: event,
    badge: "1st Place Winner",
    category: "Snap India Awards — 2024",
    title: "Winner — Hair Bridal",
    subtitle: "Trophy Inscription: Winner - Hair Bridal Hairstyle: Heer Dagha",
    description:
      "Official trophy presentation at Probeauty India, Nesco for 1st place in Hair Bridal Artistry.",
  },
  {
    id: 2,
    image: event1,
    badge: "National Stage Ceremony",
    category: "3TNX / SNAPI Professional Awards",
    title: "Trophy Presentation Ceremony",
    subtitle: "Event: 3TNX Professional Beauty & Hair Awards",
    description:
      "Recognized on stage for exceptional hair architecture and master bridal styling.",
  },
  {
    id: 3,
    image: event2,
    badge: "Stage Award & Gift Basket",
    category: "Snap India Awards — 2024",
    title: "Excellence & Master Craftsmanship",
    subtitle: "Stage Inscription: 3TNX Professional Winner",
    description:
      "Award presentation honoring signature draping, prep rituals, and bespoke bridal hair design.",
  },
];

export function AwardsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentIndex] || slides[0]!;

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-accent/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[450px] h-[300px] bg-amber-500/5 blur-[130px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Trophy className="w-4 h-4 text-accent" />
            <span>Snap India Awards — 2024</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Recognized for Excellence in <span className="text-gradient italic">Bridal Artistry</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Winner in the <strong className="text-foreground">Bridal Hairstyle Category</strong> at the <strong className="text-foreground">Snap India Awards 2024</strong> held at <strong className="text-foreground">Probeauty India, Nesco</strong>.
          </p>
        </Reveal>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Clean Unobstructed Photo Slider */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div
              className="relative rounded-3xl overflow-hidden border border-border/50 bg-black/60 backdrop-blur-md shadow-2xl group"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Full Portrait Container showing whole photo (100% clean photo, no overlays!) */}
              <div className="relative w-full aspect-[3/4] max-h-[540px] overflow-hidden bg-black/80 flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide.id}
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -40) {
                        handleNext();
                      } else if (info.offset.x > 40) {
                        handlePrev();
                      }
                    }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-contain pointer-events-auto"
                  />
                </AnimatePresence>
              </div>

              {/* Slider Bottom Thumbnail Selector Controls (Clean, no text) */}
              <div className="p-4 bg-card/40 border-t border-border/40 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentIndex(idx);
                      }}
                      className={`relative w-14 h-11 rounded-xl overflow-hidden border-2 transition-all duration-300 bg-black ${
                        idx === currentIndex
                          ? "border-accent ring-2 ring-accent/30 scale-105 opacity-100"
                          : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                      title={`Go to photo ${idx + 1}`}
                    >
                      <img
                        src={slide.image}
                        alt={`Photo ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Dynamic Photo Info & Details (Beside the Photo!) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Dynamic Details Card (Updates smoothly with active photo) */}
          <Reveal delay={0.2}>
            <div className="p-6 sm:p-7 rounded-3xl border border-accent/30 bg-accent/5 backdrop-blur-md relative overflow-hidden group transition-all duration-500 min-h-[260px]">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-accent mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold tracking-wider uppercase text-accent">
                        {activeSlide.badge}
                      </span>
                      <h4 className="font-display text-xl font-bold text-foreground">
                        {activeSlide.title}
                      </h4>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground mt-2">
                    {activeSlide.category}
                  </h3>

                  <p className="mt-2 text-sm font-mono text-accent">
                    {activeSlide.subtitle}
                  </p>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {activeSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap gap-4 text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>Probeauty India, Nesco</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>2024 Edition</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Highlights Grid */}
          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Category</span>
                </div>
                <p className="font-display text-lg font-bold text-foreground">Bridal Hairstyle</p>
                <p className="text-xs text-muted-foreground mt-0.5">1st Place Winner</p>
              </div>

              <div className="p-4 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Star className="w-4 h-4 fill-accent/20 text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Venue</span>
                </div>
                <p className="font-display text-lg font-bold text-foreground">Nesco, Mumbai</p>
                <p className="text-xs text-muted-foreground mt-0.5">Probeauty India</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
