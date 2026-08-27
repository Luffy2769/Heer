import { createFileRoute, Link } from "@tanstack/react-router";
import { hairstylesList, groomStylingList, destinationList, makeupList } from "@/lib/site-data";
import { Reveal, TiltCard, Marquee } from "@/components/site/motion-bits";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      {
        title:
          "Hair & Makeup Services — Heer Dagha | Best Hair Artist in Andheri, Bandra, Churchgate & Mumbai",
      },
      {
        name: "description",
        content:
          "Explore professional hair styling & makeup services by Heer Dagha in Mumbai (Andheri, Bandra, Churchgate). From bridal buns to sangeet waves, HD/3D makeup, birthday party looks & club night styling.",
      },
      {
        name: "keywords",
        content:
          "Makeup artists, Hair artist, Best hair artist in Andheri, Best hair artist in Bandra, Best hair artist in mumbai, Best hair artist in churchgate, Best hair artist in India, Heer Dagha, Heer daga, her dagha, her daga, heer daha, heee dagha, heee daga, bridal hair service Mumbai, sangeet blowout, cocktail waves, HD makeup, 3D makeup Mumbai",
      },
      {
        property: "og:title",
        content: "Hair & Makeup Services — Heer Dagha, Best Hair Artist in Mumbai",
      },
      {
        property: "og:description",
        content:
          "Hairstyles, groom styling, destination wedding styling & makeup artistry for weddings, cocktails, birthday parties & club events in Mumbai.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://heerdagha.com/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div className="overflow-x-hidden">
      <section className="grain px-4 pt-28 sm:pt-36 pb-6 sm:pb-14">
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

      <Marquee
        items={[
          "Hairstyles",
          "Groom Styling",
          "Makeup Artistry",
          "Destination Weddings",
          "Bridal Glam",
          "Grooms welcome",
        ]}
      />

      {/* HAIRSTYLES */}
      <section className="px-4 py-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-[clamp(1.4rem,4.5vw,3rem)] whitespace-nowrap">Hairstyles</h2>
          </Reveal>
          <div className="mt-3 sm:mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
            {hairstylesList.map((s, i) => {
              let colSpan = "lg:col-span-2 md:col-span-1";
              if (i >= 3) {
                colSpan = i === 4 ? "lg:col-span-3 md:col-span-2" : "lg:col-span-3 md:col-span-1";
              }
              return (
                <Reveal key={s.title} className={colSpan} delay={0.05 * i}>
                  <Link
                    to="/inquiry"
                    search={{ service: s.title }}
                    className="block h-full cursor-pointer"
                  >
                    <TiltCard className="group h-full" intensity={6}>
                      <article className="glass-panel h-full rounded-3xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[320px] transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(235,165,182,0.12)]">
                        <div>
                          {s.image && (
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4 bg-muted">
                              <img
                                src={s.image}
                                alt={s.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ objectPosition: (s as any).objectPosition || "center" }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                            </div>
                          )}
                          <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                            {String(i + 1).padStart(2, "0")} · Hairstyle
                          </p>
                          <h3 className="mt-2 font-display text-xl sm:text-2xl group-hover:text-accent transition-colors duration-300">
                            {s.title}
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {s.blurb}
                          </p>
                        </div>
                      </article>
                    </TiltCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* GROOM STYLING & DESTINATION WEDDINGS */}
      <section className="px-4 pb-6 sm:pb-20">
        <div className="mx-auto grid gap-6 md:gap-8 md:grid-cols-2 max-w-6xl">
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.4rem,4.5vw,3rem)] whitespace-nowrap">Groom styling</h2>
            </Reveal>
            <div className="mt-3 sm:mt-10">
              {groomStylingList.map((s) => (
                <Reveal key={s.title}>
                  <Link
                    to="/inquiry"
                    search={{ service: s.title }}
                    className="block h-full cursor-pointer"
                  >
                    <TiltCard className="group h-full" intensity={6}>
                      <article className="glass-panel h-full rounded-3xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[320px] transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(235,165,182,0.12)]">
                        <div>
                          {s.image && (
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-4 bg-muted">
                              <img
                                src={s.image}
                                alt={s.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ objectPosition: (s as any).objectPosition || "center" }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                            </div>
                          )}
                          <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                            01 · Groom Styling
                          </p>
                          <h3 className="mt-2 font-display text-xl sm:text-2xl group-hover:text-accent transition-colors duration-300">
                            {s.title}
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {s.blurb}
                          </p>
                        </div>
                      </article>
                    </TiltCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.4rem,4.5vw,3rem)] whitespace-nowrap">Destination Weddings</h2>
            </Reveal>
            <div className="mt-3 sm:mt-10">
              {destinationList.map((s) => (
                <Reveal key={s.title}>
                  <Link
                    to="/inquiry"
                    search={{ service: s.title }}
                    className="block h-full cursor-pointer"
                  >
                    <TiltCard className="group h-full" intensity={6}>
                      <article className="glass-panel h-full rounded-3xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[320px] transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(235,165,182,0.12)]">
                        <div>
                          {s.image && (
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-4 bg-muted">
                              <img
                                src={s.image}
                                alt={s.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ objectPosition: (s as any).objectPosition || "center" }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                            </div>
                          )}
                          <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                            01 · Destination
                          </p>
                          <h3 className="mt-2 font-display text-xl sm:text-2xl group-hover:text-accent transition-colors duration-300">
                            {s.title}
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {s.blurb}
                          </p>
                        </div>
                      </article>
                    </TiltCard>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAKEUP ARTISTRY */}
      <section className="px-4 pb-6 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-[clamp(1.4rem,4.5vw,3rem)] whitespace-nowrap">Makeup artistry</h2>
          </Reveal>
          <div className="mt-3 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-3">
            {makeupList.map((s, i) => (
              <Reveal key={s.title} delay={0.05 * i}>
                <Link
                  to="/inquiry"
                  search={{ service: s.title }}
                  className="block h-full cursor-pointer"
                >
                  <TiltCard className="group h-full" intensity={6}>
                    <article className="glass-panel h-full rounded-3xl p-5 sm:p-6 relative overflow-hidden flex flex-col justify-between min-h-[320px] transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-[0_20px_50px_rgba(235,165,182,0.12)]">
                      <div>
                        {s.image && (
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4 bg-muted">
                            <img
                              src={s.image}
                              alt={s.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              style={{ objectPosition: (s as any).objectPosition || "center" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                          </div>
                        )}
                        <p className="font-mono text-[10px] tracking-wider text-accent uppercase">
                          {String(i + 1).padStart(2, "0")} · Makeup
                        </p>
                        <h3 className="mt-2 font-display text-xl sm:text-2xl group-hover:text-accent transition-colors duration-300">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {s.blurb}
                        </p>
                      </div>
                    </article>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="reviews-cta glass-panel flex flex-wrap items-center justify-between gap-6 rounded-[2rem] p-8 md:p-12">
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
