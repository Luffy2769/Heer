import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { site, stats } from "@/lib/site-data";
import { Reveal, TiltCard, Parallax } from "@/components/site/motion-bits";
import portrait from "@/assets/heer-portrait.jpg";
import lookHaldi from "@/assets/look-haldi.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Heer Dagha — Hair Stylist & Makeup Artist in Mumbai" },
      {
        name: "description",
        content:
          "Meet Heer Dagha: 4+ years of bridal hair artistry and makeup in Mumbai, styling 1000+ happy faces across weddings, sangeets and destination celebrations.",
      },
      { property: "og:title", content: "About Heer Dagha — Hair Stylist & Makeup Artist" },
      {
        property: "og:description",
        content: "4+ years, 1000+ happy faces, Mumbai based and travelling for destination weddings.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const values = [
  { title: "Hair-first", text: "Structure before sparkle. A style that survives the day is the whole brief." },
  { title: "For everyone", text: "Brides, grooms, mothers, best friends. Women and men, same care." },
  { title: "Scalp health", text: "Dripping and prep rituals so the hair looks alive, not just set." },
  { title: "On time, always", text: "Timelines shared in advance and honoured on the morning." },
];

function About() {
  return (
    <div className="overflow-x-hidden">
      <section className="grain px-4 pt-36 pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] tracking-[0.28em] text-accent uppercase">
                <MapPin className="h-3.5 w-3.5" /> {site.location}
              </p>
              <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]">
                I'm Heer — <span className="text-gradient italic">hair is my language</span>
              </h1>
              <p className="mt-6 max-w-xl text-muted-foreground">
                Four years ago I started pinning buns for friends before college fests. Today I've
                styled over a thousand faces — brides mid-monsoon, grooms twenty minutes before the
                baraat, mothers who insisted they “don't do makeup”.
              </p>
              <p className="mt-4 max-w-xl text-muted-foreground">
                My work sits between structural hair engineering and soft, skin-first makeup. I
                design each look around your outfit weight, jewellery placement, face architecture
                and — most importantly — how long you need it to survive.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/inquiry"
                  className="rounded-full accent-gradient px-7 py-3.5 font-semibold text-accent-foreground"
                >
                  Work with me
                </Link>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-7 py-3.5 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  @{site.handle}
                </a>
              </div>
            </Reveal>
          </div>

          <Parallax distance={40}>
            <TiltCard className="group" intensity={10}>
              <img
                src={portrait}
                alt="Portrait of hair stylist Heer Dagha"
                loading="lazy"
                width={1008}
                height={1264}
                className="w-full rounded-[2.5rem] border border-border object-cover"
              />
            </TiltCard>
          </Parallax>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.06 * i}>
              <div className="glass-panel rounded-3xl p-7">
                <p className="font-display text-4xl text-accent">{s.value}</p>
                <p className="mt-2 text-xs tracking-wider text-muted-foreground uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Parallax distance={30}>
            <img
              src={lookHaldi}
              alt="Haldi hairstyle with marigold flowers"
              loading="lazy"
              width={900}
              height={1100}
              className="w-full rounded-[2rem] border border-border object-cover"
            />
          </Parallax>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={0.06 * i}>
                <div className="glass-panel h-full rounded-3xl p-6">
                  <h2 className="font-display text-xl">{v.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
