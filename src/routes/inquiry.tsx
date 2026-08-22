import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { site, hairServices, makeupServices } from "@/lib/site-data";
import { Reveal, TiltCard } from "@/components/site/motion-bits";

export const Route = createFileRoute("/inquiry")({
  head: () => ({
    meta: [
      { title: "Inquiry — Book Heer Dagha for Your Wedding, Mumbai" },
      {
        name: "description",
        content:
          "Check availability and book Heer Dagha for bridal hair, groom styling and makeup in Mumbai or at your destination wedding. Reply within 24 hours.",
      },
      { property: "og:title", content: "Inquiry — Book Heer Dagha for Your Wedding" },
      {
        property: "og:description",
        content: "Share your dates, city and ceremonies — availability confirmed within 24 hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inquiry,
});

const allServices = [...hairServices.map((s) => s.title), ...makeupServices.map((s) => s.title)];

function Inquiry() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    city: "",
    service: allServices[0] ?? "",
    notes: "",
  });

  const message = `Hi Heer! I'd love to book you.

Name: ${form.name}
Event date: ${form.date}
City: ${form.city}
Service: ${form.service}
Details: ${form.notes}`;

  const waHref = `${site.whatsapp}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Booking inquiry — ${form.name || "New client"}`,
  )}&body=${encodeURIComponent(message)}`;

  const field =
    "w-full rounded-2xl border border-input bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-accent";

  return (
    <div className="overflow-x-hidden">
      <section className="grain px-4 pt-36 pb-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Inquiry</p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]">
                Let's check <span className="text-gradient italic">your date</span>
              </h1>
              <p className="mt-5 max-w-md text-muted-foreground">
                Fill this in and it opens a ready-made WhatsApp or email. I reply within 24 hours,
                usually much sooner.
              </p>
            </Reveal>

            <Reveal delay={0.12} className="mt-10 space-y-5">
              <a
                href={site.phoneHref}
                className="glass-panel flex items-center gap-4 rounded-3xl p-5 transition-colors hover:border-accent"
              >
                <Phone className="h-5 w-5 text-accent" />
                <span>
                  <span className="block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Call / WhatsApp
                  </span>
                  <span className="text-lg">{site.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="glass-panel flex items-center gap-4 rounded-3xl p-5 transition-colors hover:border-accent"
              >
                <Mail className="h-5 w-5 text-accent" />
                <span>
                  <span className="block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Work email
                  </span>
                  <span className="text-lg">{site.email}</span>
                </span>
              </a>
              <div className="grid gap-5 sm:grid-cols-2">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel flex items-center gap-3 rounded-3xl p-5 transition-colors hover:border-accent"
                >
                  <Instagram className="h-5 w-5 text-accent" /> @{site.handle}
                </a>
                <div className="glass-panel flex items-center gap-3 rounded-3xl p-5">
                  <MapPin className="h-5 w-5 text-accent" /> {site.location}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <TiltCard className="group" intensity={5}>
              <form
                className="glass-panel space-y-4 rounded-[2rem] p-7 md:p-9"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open(waHref, "_blank", "noopener");
                }}
              >
                <h2 className="font-display text-2xl">Booking details</h2>

                <label className="block">
                  <span className="mb-1.5 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Your name
                  </span>
                  <input
                    required
                    className={field}
                    placeholder="Heer's next client"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      Event date
                    </span>
                    <input
                      type="date"
                      required
                      className={field}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      City
                    </span>
                    <input
                      required
                      className={field}
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Service
                  </span>
                  <select
                    className={field}
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    {allServices.map((s) => (
                      <option key={s} value={s} className="bg-popover text-popover-foreground">
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Tell me more
                  </span>
                  <textarea
                    rows={4}
                    className={field}
                    placeholder="Outfit, ceremonies, number of people, timings…"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </label>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full accent-gradient px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
                  >
                    <Send className="h-4 w-4" /> Send on WhatsApp
                  </button>
                  <a
                    href={mailHref}
                    className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    Send as email
                  </a>
                </div>
              </form>
            </TiltCard>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
