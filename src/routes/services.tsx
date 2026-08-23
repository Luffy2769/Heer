import { createFileRoute, Link } from "@tanstack/react-router";
import { hairstylesList, groomStylingList, destinationList, makeupList } from "@/lib/site-data";
import { Reveal, TiltCard, Marquee } from "@/components/site/motion-bits";
import lookCocktail from "@/assets/look-cocktail.jpg";
import lookGroom from "@/assets/look-groom.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Bridal Hair & Makeup by Heer Dagha, Mumbai" },
      {
        name: "description",
        content:
          "Wedding, cocktail, sangeet, haldi/mehendi, engagement, reception and destination hair styling and makeup for women and men.",
      },
      { property: "og:title", content: "Services — Bridal Hair & Makeup by Heer Dagha" },
      {
        property: "og:description",
        content:
          "Hairstyles, groom styling, destination wedding styling and makeup artistry in Mumbai and beyond.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="overflow-x-hidden">
      <section className="grain px-4 pt-36 pb-14">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Services</p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]">
              Every ceremony, <span className="text-gradient italic">its own silhouette</span>
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Styling for brides, grooms, families and guests — women and men both. Studio in
              Mumbai, kit packed for anywhere.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee items={["Hairstyles", "Groom Styling", "Makeup Artistry", "Destination Weddings", "Bridal Glam", "Grooms welcome"]} />

      {/* HAIRSTYLES */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Hairstyles</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hairstylesList.map((s, i) => (
              <Reveal key={s.title} delay={0.05 * i}>
                <TiltCard className="group h-full" intensity={9}>
                  <article className="glass-panel h-full rounded-3xl p-7">
                    <p className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GROOM STYLING & DESTINATION WEDDINGS */}
      <section className="px-4 pb-20">
        <div className="mx-auto grid gap-8 md:grid-cols-2 max-w-6xl">
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Groom styling</h2>
            </Reveal>
            <div className="mt-10">
              {groomStylingList.map((s) => (
                <Reveal key={s.title}>
                  <TiltCard className="group h-full" intensity={9}>
                    <article className="glass-panel h-full rounded-3xl p-7">
                      <p className="font-mono text-xs text-accent">01</p>
                      <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                    </article>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Destination Weddings</h2>
            </Reveal>
            <div className="mt-10">
              {destinationList.map((s) => (
                <Reveal key={s.title}>
                  <TiltCard className="group h-full" intensity={9}>
                    <article className="glass-panel h-full rounded-3xl p-7">
                      <p className="font-mono text-xs text-accent">01</p>
                      <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                    </article>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAKEUP ARTISTRY */}
      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Makeup artistry</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {makeupList.map((s, i) => (
                <Reveal key={s.title} delay={0.05 * i}>
                  <TiltCard className="group h-full" intensity={9}>
                    <article className="glass-panel h-full rounded-3xl p-7">
                      <p className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-display text-2xl">{s.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground">{s.blurb}</p>
                    </article>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <img
              src={lookCocktail}
              alt="Cocktail hairstyle styled by Heer Dagha"
              loading="lazy"
              width={900}
              height={1100}
              className="h-56 w-full rounded-3xl border border-border object-cover lg:h-64"
            />
            <img
              src={lookGroom}
              alt="Groom hair styling and HD base"
              loading="lazy"
              width={900}
              height={1100}
              className="h-56 w-full rounded-3xl border border-border object-cover lg:h-64"
            />
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="glass-panel flex flex-wrap items-center justify-between gap-6 rounded-[2rem] p-8 md:p-12">
              <div>
                <h2 className="font-display text-3xl">Not sure what your day needs?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Send your dates and outfits — I'll map the looks for you.
                </p>
              </div>
              <Link
                to="/inquiry"
                className="rounded-full accent-gradient px-7 py-3.5 font-semibold text-accent-foreground"
              >
                Send an inquiry
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
