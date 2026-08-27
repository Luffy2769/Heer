import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ArrowUpRight } from "lucide-react";
import { site, stats } from "@/lib/site-data";
import { Reveal, TiltCard, Parallax } from "@/components/site/motion-bits";
import portrait from "@/assets/Heer_about.webp";
import lookHaldi from "@/assets/Haldi_mehendi.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Heer Dagha — Hair Stylist & Makeup Artist in Mumbai" },
      {
        name: "description",
        content:
          "Meet Heer Dagha: 4+ years of bridal hair artistry and makeup in Mumbai, styling 1500+ happy faces across weddings, sangeets and destination celebrations.",
      },
      { property: "og:title", content: "About Heer Dagha — Hair Stylist & Makeup Artist" },
      {
        property: "og:description",
        content:
          "4+ years, 1500+ happy faces, Mumbai based and travelling for destination weddings.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  {
    title: "Hair-first",
    text: "Structure before sparkle. A style that survives the day is the whole brief.",
  },
  {
    title: "For everyone",
    text: "Brides, grooms, mothers, best friends. Women and men, same care.",
  },
  {
    title: "Scalp health",
    text: "Draping and prep rituals so the hair looks alive, not just set.",
  },
  {
    title: "On time, always",
    text: "Timelines shared in advance and honoured on the morning.",
  },
];

function About() {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      {/* HERO & STATS SECTION */}
      <section className="grain relative px-4 pt-28 sm:pt-36 pb-3 sm:pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-[11px] tracking-[0.28em] text-accent uppercase font-bold">
                <MapPin className="h-3.5 w-3.5 text-accent" /> {site.location}
              </p>
              <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] tracking-tight">
                Heer Dagha — <span className="text-gradient italic">hair is my language</span>
              </h1>

              {/* Mobile Image (only visible on mobile/tablet) */}
              <div className="block lg:hidden my-6">
                <Parallax distance={20}>
                  <TiltCard className="group" intensity={8}>
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-2 shadow-2xl transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_20px_50px_rgba(235,165,182,0.15)]">
                      <img
                        src={portrait}
                        alt="Portrait of hair stylist Heer Dagha"
                        loading="lazy"
                        width={1008}
                        height={1264}
                        className="w-full h-[380px] sm:h-[460px] rounded-[2rem] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </TiltCard>
                </Parallax>
              </div>

              <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
                Heer Dagha is an optimistic leading artist in today’s generation of the hairstyle
                and makeup industry. Her creation for every hairstyle holds dedication and has the
                ability to pass the envisioned look of every bride.
              </p>
              <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                With more than 4 years of dedicated practice, her experience speaks professionalism.
                Heer is mainly known for her flawless and elegant finished hairstyles.
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-row items-center gap-2.5 sm:gap-4">
                <Link
                  to="/inquiry"
                  className="rounded-full accent-gradient px-4 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg hover:shadow-accent/25 hover:scale-105 transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
                >
                  <span>Work with me</span>
                  <ArrowUpRight className="size-3.5 sm:size-4" />
                </Link>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border bg-card/40 px-3.5 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent/5 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
                >
                  <span>@{site.handle}</span>
                  <ArrowUpRight className="size-3 sm:size-3.5 opacity-60" />
                </a>
              </div>

              {/* Mobile-Only Stats Boxes (directly under buttons on phone ONLY) */}
              <div className="mt-3 block sm:hidden grid grid-cols-2 gap-2.5">
                {stats.map((s, i) => (
                  <TiltCard key={s.label} intensity={8} className="h-full">
                    <div className="glass-panel h-full rounded-2xl p-3.5 relative overflow-hidden flex flex-col justify-between group">
                      <span className="absolute -right-2 -bottom-2 font-display text-4xl font-bold opacity-[0.04] text-accent">
                        0{i + 1}
                      </span>
                      <div>
                        <p className="font-display text-2xl font-bold text-accent">
                          {s.value}
                        </p>
                        <p className="mt-1 text-[9px] tracking-wider text-muted-foreground uppercase font-semibold leading-tight">
                          {s.label}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Desktop Image (only visible on desktop) */}
          <div className="hidden lg:block">
            <Parallax distance={30}>
              <TiltCard className="group" intensity={8}>
                <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-2 shadow-2xl transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_20px_50px_rgba(235,165,182,0.15)]">
                  <img
                    src={portrait}
                    alt="Portrait of hair stylist Heer Dagha"
                    loading="lazy"
                    width={1008}
                    height={1264}
                    className="w-full h-[460px] sm:h-[520px] rounded-[2rem] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </TiltCard>
            </Parallax>
          </div>
        </div>
      </section>

      {/* STATS SECTION — Original Desktop Version */}
      <section className="hidden sm:block px-4 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.06 * i}>
              <TiltCard intensity={8} className="h-full">
                <div className="glass-panel h-full rounded-3xl p-7 relative overflow-hidden flex flex-col justify-between group hover:border-accent/40 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(235,165,182,0.12)]">
                  <span className="absolute -right-2 -bottom-2 font-display text-7xl font-bold opacity-[0.04] text-accent group-hover:scale-110 group-hover:opacity-[0.08] transition-all duration-500">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-display text-5xl font-bold text-accent group-hover:scale-105 transition-transform origin-left">
                      {s.value}
                    </p>
                    <p className="mt-3 text-xs tracking-wider text-muted-foreground uppercase font-semibold leading-tight">
                      {s.label}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HER STORY / JOURNEY SECTION */}
      <section className="px-4 pt-0 pb-1 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="glass-panel relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-12 border border-border/80 shadow-2xl">
              <span className="text-[11px] tracking-[0.28em] text-accent uppercase font-bold">
                Her Journey & Passion
              </span>
              <h2 className="mt-2 sm:mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight text-gradient italic">
                The Story Behind the Craft
              </h2>
              <div className="mt-3 sm:mt-6 grid gap-3.5 md:gap-6 md:grid-cols-2 text-muted-foreground leading-relaxed text-sm sm:text-base">
                <p>
                  Heer was just 16 when she thought she wanted to start her career doing hair and makeup, started as a young artist and is continuing the practice very deliberately and affectionately.
                </p>
                <p>
                  She recognised her Art of perception can lead to way more changes and progress in this field, carrying immense gratitude and blessings from the clients she holds currently.
                </p>
                <p>
                  Makeup has always been an emotion more over a career. One needs to understand passion and career, and merging into the same path takes a lot of efforts, which Heer is willing to put.
                </p>
                <p>
                  She faced a lot of challenges in growing her business. But overlooking to it and handling the same with a systematic approach makes her unique.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES SECTION — Special Glass Panels with Unique Layout */}
      <section className="px-4 pt-1 sm:pt-0 pb-12 sm:pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Parallax distance={30}>
            <TiltCard intensity={6}>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-border shadow-2xl group">
                <img
                  src={lookHaldi}
                  alt="Haldi hairstyle with marigold flowers"
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="w-full h-[440px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </TiltCard>
          </Parallax>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={0.06 * i}>
                <TiltCard intensity={6} className="h-full">
                  <div className="glass-panel h-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 relative overflow-hidden group hover:border-accent/40 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(235,165,182,0.12)]">
                    <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold opacity-60">
                      0{i + 1} // PHILOSOPHY
                    </span>
                    <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {v.title}
                    </h2>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {v.text}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
