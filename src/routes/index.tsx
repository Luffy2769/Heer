import { useEffect, useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { site, stats, hairServices, makeupServices, reviews, process } from "@/lib/site-data";
import { Reveal, TiltCard, Magnetic, Marquee, Parallax } from "@/components/site/motion-bits";
import AccordionGallery from "@/components/site/AccordionGallery";
import CircularGallery from "@/components/site/CircularGallery";
import heroBride from "@/assets/hero-bride.jpg";
import lookSoftGlam from "@/assets/look-softglam.jpg";
import lookCocktail from "@/assets/look-cocktail.jpg";
import lookHaldi from "@/assets/look-haldi.jpg";
import lookGroom from "@/assets/look-groom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heer Dagha — Bridal Hair Stylist & Makeup Artist, Mumbai" },
      {
        name: "description",
        content:
          "Heer Dagha is a Mumbai-based hair stylist and makeup artist crafting wedding, sangeet, cocktail and reception looks for women and men. 4+ years, 1000+ happy faces.",
      },
      { property: "og:title", content: "Heer Dagha — Bridal Hair Stylist & Makeup Artist, Mumbai" },
      {
        property: "og:description",
        content:
          "Wedding, sangeet, haldi, cocktail and reception hair styling plus soft glam, HD and 3D makeup. Mumbai based, available for destination weddings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const galleryLooks = [
  { src: lookCocktail, label: "Cocktail waves" },
  { src: lookSoftGlam, label: "Soft glam" },
  { src: lookHaldi, label: "Haldi florals" },
  { src: lookGroom, label: "Groom styling" },
];

function CountUp({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          const start = 0;
          const end = numericPart;
          if (start === end) {
            setCount(end);
            return;
          }
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            if (!active) return;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOutCubic * end);
            setCount(currentCount);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [numericPart]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="grain relative flex min-h-screen items-center px-4 pt-32 pb-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] tracking-[0.28em] text-accent uppercase"
            >
              <Sparkles className="h-3.5 w-3.5" /> {site.location}
            </motion.p>

            <h1 className="mt-6 font-brand text-[clamp(1.8rem,5.8vw,4.8rem)] font-light leading-[1.05] tracking-wide uppercase whitespace-nowrap">
              <span className="text-gradient">
                {"HEER DAGHA".split("").map((c, i) => (
                  <motion.span
                    key={`a${i}`}
                    className="inline-block"
                    initial={{ opacity: 0, y: 40, rotateX: -70 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {c === " " ? "\u00A0" : c}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-6 max-w-md text-base text-muted-foreground"
            >
              Bridal and editorial hair artistry, dripping rituals and makeup — engineered to hold
              through every ceremony, for women and men alike.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Magnetic>
                <Link
                  to="/inquiry"
                  className="group inline-flex items-center gap-2 rounded-full accent-gradient px-7 py-3.5 font-semibold text-accent-foreground"
                >
                  Book your look
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
              <Link
                to="/services"
                className="rounded-full border border-border px-7 py-3.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Explore services
              </Link>
            </motion.div>

            <div className="mt-14 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4 w-full justify-items-center lg:justify-items-start">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i} className="text-center lg:text-left">
                  <p className="font-display text-3xl text-accent">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-1 text-[11px] tracking-wider text-muted-foreground uppercase">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              aria-hidden
              className="absolute -inset-8 rounded-[3rem] accent-gradient opacity-25 blur-3xl"
              animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.32, 0.2] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
            <TiltCard className="group relative" intensity={9}>
              <div className="overflow-hidden rounded-[2.5rem] border border-border">
                <img
                  src={heroBride}
                  alt="Bridal updo with gold hair jewellery styled by Heer Dagha"
                  width={1104}
                  height={1408}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="glass-panel absolute -bottom-6 -left-4 rounded-2xl px-5 py-4"
                style={{ transform: "translateZ(60px)" }}
              >
                <p className="flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Loved by 1000+ brides, grooms & guests
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "Wedding Hair",
          "Soft Glam",
          "Sangeet",
          "HD Makeup",
          "Destination",
          "3D Looks",
          "Dripping",
        ]}
      />

      {/* SERVICES PREVIEW */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] text-accent uppercase">What I do</p>
              <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight">
                Hair that holds. <span className="text-gradient italic">Makeup that reads.</span>
              </h2>
            </div>
            <Link to="/services" className="text-sm text-muted-foreground hover:text-accent">
              View all services →
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {(() => {
              const services = hairServices
                .slice(0, 3)
                .map((s) => ({ ...s, type: "Hairstyling" }))
                .concat(makeupServices.slice(0, 3).map((s) => ({ ...s, type: "Makeup Artistry" })));
              return services.map((s, i) => {
                const colSpan = i === 0 || i === 5 ? "md:col-span-2" : "md:col-span-1";
                return (
                  <Reveal key={s.title} className={colSpan} delay={0.06 * i}>
                    <Link
                      to="/inquiry"
                      search={{ service: s.title }}
                      className="group block h-full cursor-pointer"
                    >
                      <TiltCard className="h-full" intensity={6}>
                        <div className="glass-panel h-full rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(235,165,182,0.1)]">
                          <div>
                            <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                              {s.type}
                            </p>
                            <h3 className="mt-4 font-display text-2xl group-hover:text-accent transition-colors duration-300">
                              {s.title}
                            </h3>
                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-[90%]">
                              {s.blurb}
                            </p>
                          </div>
                          <span className="absolute right-6 top-4 font-display text-8xl font-bold opacity-[0.03] text-accent pointer-events-none select-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.08]">
                            0{i + 1}
                          </span>
                        </div>
                      </TiltCard>
                    </Link>
                  </Reveal>
                );
              });
            })()}
            <Reveal className="md:col-span-1" delay={0.36}>
              <Link
                to="/inquiry"
                className="glass-panel h-full rounded-3xl p-7 flex flex-col justify-between bg-accent/10 hover:bg-accent/15 group hover:scale-[1.02] transition-all duration-300 border border-transparent shadow-lg cursor-pointer min-h-[220px] group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(235,165,182,0.1)]"
              >
                <div>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-accent font-semibold">
                    Inquiry
                  </span>
                  <h3 className="mt-4 font-display text-3xl leading-snug text-foreground group-hover:text-accent transition-colors duration-300">
                    Let's craft your look.
                  </h3>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                    Secure your wedding date, consultation, or custom package now.
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between text-xs font-semibold tracking-wider uppercase border-t border-border pt-4 text-accent">
                  <span>Check Availability</span>
                  <span>→</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)]">Recent looks</h2>
          </Reveal>
          {/* Desktop/Tablet Accordion Gallery */}
          <Reveal className="mt-10 hidden sm:block">
            <AccordionGallery
              items={galleryLooks.map((g) => ({
                image: g.src,
                label: g.label,
                link: "/services",
              }))}
              defaultIndex={1}
              expandRatio={0.45}
              trigger="hover"
              accentColor="var(--color-primary)"
              overlayColor="#241114"
              textColor="#ffffff"
              grayscale={false}
              showLabels
              duration={0.6}
              ease="power3.out"
              parallax={0.4}
              tilt={6}
              stagger={0.06}
              height={480}
              gap={12}
              radius={24}
              orientation="horizontal"
            />
          </Reveal>

          {/* Mobile Circular Gallery */}
          <Reveal className="mt-10 sm:hidden">
            <div
              style={{ height: "440px", position: "relative" }}
              className="w-full overflow-hidden rounded-3xl border border-border bg-card/25"
            >
              <CircularGallery
                items={galleryLooks.map((g) => ({
                  image: g.src,
                  text: g.label,
                }))}
                bend={1.0}
                textColor="var(--color-heading)"
                borderRadius={0.05}
                scrollEase={0.12}
                font="bold 20px Manrope"
                scrollSpeed={3.5}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] text-accent uppercase">The process</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-tight">
              Calm mornings, <span className="text-gradient italic">zero surprises</span>
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Four years of wedding mornings taught me that a look is only as good as the plan
              behind it.
            </p>
          </Reveal>
          <Reveal className="flex flex-col justify-center">
            <div className="glass-panel relative flex min-h-[290px] md:min-h-[380px] flex-col justify-between rounded-[2.5rem] p-6 md:p-10">
              {/* Progress and Steps Indicators */}
              <div className="relative mb-4 md:mb-6 px-1">
                {/* Background Track Line */}
                <div className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-border/40" />

                {/* Animated Progress Line */}
                <motion.div
                  className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(activeStep / (process.length - 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 90, damping: 18 }}
                />

                {/* Indicator Nodes */}
                <div className="relative flex justify-between">
                  {process.map((p, idx) => {
                    const isCompleted = idx <= activeStep;
                    const isActive = idx === activeStep;
                    return (
                      <button
                        key={p.step}
                        type="button"
                        onClick={() => setActiveStep(idx)}
                        className={`relative z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border text-xs font-semibold font-mono transition-all duration-300 ${
                          isActive
                            ? "bg-primary border-transparent text-primary-foreground shadow-[0_0_15px_var(--color-accent)] scale-110"
                            : isCompleted
                              ? "bg-accent border-transparent text-accent-foreground"
                              : "bg-surface border-border text-muted-foreground hover:border-accent hover:text-foreground"
                        }`}
                      >
                        {p.step}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Body - Content transition */}
              <div className="relative flex-1 flex flex-col justify-center overflow-hidden py-2 md:py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 25, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -25, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Giant Watermark Step Number */}
                    <span className="absolute -top-10 -right-2 select-none font-display text-[7.5rem] font-bold text-accent/5 pointer-events-none md:-top-14 md:-right-6 md:text-[11rem]">
                      {process[activeStep].step}
                    </span>

                    <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
                      Phase {process[activeStep].step}
                    </span>

                    <h3 className="mt-1 md:mt-2 font-display text-2xl md:text-3xl text-gradient">
                      {process[activeStep].title}
                    </h3>

                    <p className="mt-2 md:mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm lg:text-base">
                      {process[activeStep].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between border-t border-border/30 pt-4 md:pt-6">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="group flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30 cursor-pointer bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  Prev
                </button>

                {activeStep < process.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep((prev) => Math.min(process.length - 1, prev + 1))}
                    className="group inline-flex items-center gap-1.5 rounded-full accent-gradient px-6 py-3 text-xs font-semibold text-accent-foreground transition-transform hover:scale-[1.03] cursor-pointer"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 animate-pulse" />
                  </button>
                ) : (
                  <Link
                    to="/inquiry"
                    className="group inline-flex items-center gap-1.5 rounded-full accent-gradient px-6 py-3 text-xs font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
                  >
                    Book a date
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REVIEW TEASER */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="glass-panel grain rounded-[2.5rem] p-8 md:p-14">
              <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Kind words</p>
              <blockquote className="mt-6 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-snug text-foreground">
                “{reviews[0]?.quote}”
              </blockquote>
              <p className="mt-6 text-sm text-muted-foreground">
                {reviews[0]?.name} · {reviews[0]?.role}
              </p>
              <Link to="/reviews" className="mt-8 inline-block text-sm text-accent hover:underline">
                Read all reviews →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
