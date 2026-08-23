import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import {
  site,
  hairstylesList,
  groomStylingList,
  destinationList,
  makeupList,
} from "@/lib/site-data";
import { Reveal } from "@/components/site/motion-bits";

export const Route = createFileRoute("/inquiry")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: (search.service as string) || undefined,
  }),
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

const serviceGroups = [
  { name: "Hairstyles", list: hairstylesList },
  { name: "Makeup", list: makeupList },
  { name: "Groom Styling", list: groomStylingList },
  { name: "Destination", list: destinationList },
];

function Inquiry() {
  const { service } = Route.useSearch();

  const [form, setForm] = useState({
    name: "",
    date: "",
    city: "",
    services: (service ? [service] : []) as string[],
    notes: "",
  });

  const [submitType, setSubmitType] = useState<"whatsapp" | "email">("whatsapp");
  const [error, setError] = useState<string | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState("Hairstyles");

  useEffect(() => {
    if (service) {
      setForm((prev) => ({
        ...prev,
        services: prev.services.includes(service) ? prev.services : [service, ...prev.services],
      }));
      // Auto-switch to the tab containing the preselected service
      const group = serviceGroups.find((g) => g.list.some((item) => item.title === service));
      if (group) {
        setActiveServiceTab(group.name);
      }
    }
  }, [service]);
  const today = new Date().toISOString().split("T")[0];
  const maxDate = `${new Date().getFullYear() + 15}-12-31`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.services.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    setError(null);

    const message = `Hi Heer! I'd love to book you.

Name: ${form.name}
Event date: ${form.date}
City: ${form.city}
Services: ${form.services.join(", ")}
Details: ${form.notes}`;

    if (submitType === "whatsapp") {
      const waHref = `${site.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(waHref, "_blank", "noopener,noreferrer");
    } else {
      const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
        `Booking inquiry — ${form.name || "New client"}`,
      )}&body=${encodeURIComponent(message)}`;
      window.location.href = mailHref;
    }
  };

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
                usually sooner.
              </p>
            </Reveal>

            <div className="mt-12 space-y-6 max-w-md">
              <Reveal delay={0.06}>
                <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                      Call / WhatsApp
                    </p>
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block font-display text-lg text-foreground hover:text-accent transition-colors"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                      Work Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 block font-display text-lg text-foreground hover:text-accent transition-colors"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <div className="grid grid-cols-2 gap-4">
                <Reveal delay={0.18}>
                  <a
                    href={`https://instagram.com/${site.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-panel rounded-2xl p-5 flex items-center gap-4 hover:border-accent/40 transition-colors cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                        Instagram
                      </p>
                      <span className="mt-1 block font-display text-base text-foreground hover:text-accent transition-colors">
                        Visit profile
                      </span>
                    </div>
                  </a>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="glass-panel rounded-2xl p-5 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                        Location
                      </p>
                      <span className="mt-1 block font-display text-base text-foreground">
                        Mumbai
                      </span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <Reveal delay={0.15}>
            <form
              className="glass-panel space-y-6 rounded-[2rem] p-6 md:p-8"
              onSubmit={handleSubmit}
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
                    min={today}
                    max={maxDate}
                    className={field}
                    value={form.date}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (val) {
                        const parts = val.split("-");
                        if (parts[0] && parts[0].length > 4) {
                          parts[0] = parts[0].slice(0, 4);
                          val = parts.join("-");
                        }
                      }
                      setForm({ ...form, date: val });
                    }}
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

              <div className="space-y-3.5">
                <span className="block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Services (Select multiple)
                </span>

                {/* Tabbed category row */}
                <div className="flex border-b border-border gap-4 pb-2 text-xs font-semibold overflow-x-auto scrollbar-none">
                  {serviceGroups.map((group) => (
                    <button
                      key={group.name}
                      type="button"
                      onClick={() => setActiveServiceTab(group.name)}
                      className={`pb-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        activeServiceTab === group.name
                          ? "border-accent text-accent"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {group.name}
                    </button>
                  ))}
                </div>

                {/* Selected tab service list */}
                <div className="py-1">
                  {serviceGroups.map((group) => {
                    if (group.name !== activeServiceTab) return null;
                    return (
                      <div key={group.name} className="flex flex-wrap gap-1.5">
                        {group.list.map((s) => {
                          const isSelected = form.services.includes(s.title);
                          return (
                            <button
                              key={s.title}
                              type="button"
                              onClick={() => {
                                const newServices = isSelected
                                  ? form.services.filter((val) => val !== s.title)
                                  : [...form.services, s.title];
                                setForm({ ...form, services: newServices });
                                if (newServices.length > 0) {
                                  setError(null);
                                }
                              }}
                              className={`rounded-full px-3.5 py-2 text-xs transition-all cursor-pointer border ${
                                isSelected
                                  ? "accent-gradient text-accent-foreground border-transparent shadow-sm scale-105"
                                  : "bg-card/45 border-border text-muted-foreground hover:border-accent hover:text-foreground"
                              }`}
                            >
                              {s.title}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Display currently selected services across all tabs */}
                {form.services.length > 0 && (
                  <div className="mt-3 bg-accent/[0.02] border border-border/40 rounded-2xl p-3">
                    <span className="block text-[9px] tracking-wider text-muted-foreground uppercase font-bold">
                      Selected ({form.services.length}):
                    </span>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {form.services.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 bg-accent/10 border border-accent/25 text-accent text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                services: prev.services.filter((s) => s !== item),
                              }));
                            }}
                            className="text-accent/60 hover:text-accent font-bold text-[8px] ml-0.5"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

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

              {error && (
                <p className="text-xs text-destructive font-medium animate-pulse">{error}</p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  onClick={() => setSubmitType("whatsapp")}
                  className="inline-flex items-center gap-2 rounded-full accent-gradient px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Send className="h-4 w-4" /> Send on WhatsApp
                </button>
                <button
                  type="submit"
                  onClick={() => setSubmitType("email")}
                  className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent cursor-pointer bg-transparent"
                >
                  Send as email
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
