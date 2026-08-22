import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { reviews, stats } from "@/lib/site-data";
import { Reveal, TiltCard } from "@/components/site/motion-bits";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What Brides & Grooms Say | Heer Dagha" },
      {
        name: "description",
        content:
          "Real words from brides, grooms and guests styled by Heer Dagha across Mumbai, Goa, Udaipur and destination weddings.",
      },
      { property: "og:title", content: "Reviews — What Brides & Grooms Say | Heer Dagha" },
      {
        property: "og:description",
        content: "1000+ happy faces and counting. Read the reviews from Heer Dagha's clients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <div className="overflow-x-hidden">
      <section className="grain px-4 pt-36 pb-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Review</p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]">
              1000+ faces, <span className="text-gradient italic">one standard</span>
            </h1>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.06 * i}>
                <p className="font-display text-4xl text-accent">{s.value}</p>
                <p className="mt-1 text-[11px] tracking-wider text-muted-foreground uppercase">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={0.05 * i}>
              <TiltCard className="group h-full" intensity={8}>
                <article className="glass-panel h-full rounded-3xl p-7">
                  <Quote className="h-6 w-6 text-accent/70" />
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">“{r.quote}”</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="font-display text-lg">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.role}</p>
                    </div>
                    <span className="flex gap-0.5 text-accent">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-current" />
                      ))}
                    </span>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24">
        <Reveal className="mx-auto max-w-6xl">
          <div className="glass-panel flex flex-wrap items-center justify-between gap-6 rounded-[2rem] p-8 md:p-12">
            <h2 className="font-display text-3xl">Ready to be the next one?</h2>
            <Link
              to="/inquiry"
              className="rounded-full accent-gradient px-7 py-3.5 font-semibold text-accent-foreground"
            >
              Check my date
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
