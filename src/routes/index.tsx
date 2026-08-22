import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { site, stats, hairServices, makeupServices, reviews, process } from "@/lib/site-data";
import { Reveal, TiltCard, Magnetic, Marquee, Parallax } from "@/components/site/motion-bits";
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

function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="grain relative flex min-h-screen items-center px-4 pt-32 pb-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] tracking-[0.28em] text-accent uppercase"
            >
              <Sparkles className="h-3.5 w-3.5" /> {site.location}
            </motion.p>

            <h1 className="mt-6 font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.92]">
              {"Hair by".split("").map((c, i) => (
                <motion.span
                  key={`a${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 40, rotateX: -70 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="text-gradient italic"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Heer Dagha
              </motion.span>
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
              className="mt-9 flex flex-wrap items-center gap-4"
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

            <div className="mt-14 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i}>
                  <p className="font-display text-3xl text-accent">{s.value}</p>
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
            {hairServices.slice(0, 3).concat(makeupServices.slice(0, 3)).map((s, i) => (
              <Reveal key={s.title} delay={0.06 * i}>
                <TiltCard className="group h-full" intensity={8}>
                  <div className="glass-panel h-full rounded-3xl p-7">
                    <p className="font-mono text-xs text-accent">0{i + 1}</p>
                    <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)]">Recent looks</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryLooks.map((g, i) => (
              <Parallax key={g.label} distance={i % 2 ? 28 : 52}>
                <TiltCard className="group" intensity={10}>
                  <figure className="overflow-hidden rounded-3xl border border-border">
                    <img
                      src={g.src}
                      alt={`${g.label} styled by Heer Dagha`}
                      loading="lazy"
                      width={900}
                      height={1100}
                      className="h-[22rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <figcaption className="bg-card/60 px-4 py-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      {g.label}
                    </figcaption>
                  </figure>
                </TiltCard>
              </Parallax>
            ))}
          </div>
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
          <div className="grid gap-4 sm:grid-cols-2">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={0.08 * i}>
                <div className="glass-panel h-full rounded-3xl p-6">
                  <span className="font-display text-4xl text-accent/60">{p.step}</span>
                  <h3 className="mt-3 text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
