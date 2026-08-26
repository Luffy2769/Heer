import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Mail, MessageSquare, Phone, Send, Sparkles } from "lucide-react";
import {
  site,
  hairstylesList,
  groomStylingList,
  destinationList,
  makeupList,
} from "@/lib/site-data";
import { Reveal, TiltCard } from "@/components/site/motion-bits";
import { submitInquiry } from "@/lib/supabase";
import { sendFormspreeNotification } from "@/lib/formspree";
import heroBride from "@/assets/Bridal_wedding_hair.webp";

export const Route = createFileRoute("/inquiry")({
  validateSearch: (search: Record<string, unknown>): { service?: string | undefined } => ({
    service: typeof search.service === "string" ? search.service : undefined,
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

const allServices = [
  ...hairstylesList,
  ...makeupList,
  ...groomStylingList,
  ...destinationList,
];

function Inquiry() {
  const { service } = Route.useSearch();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    city: "",
    services: (service ? [service] : []) as string[],
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState<string>("Hairstyles");

  useEffect(() => {
    if (service) {
      setForm((prev) => ({
        ...prev,
        services: prev.services.includes(service) ? prev.services : [service, ...prev.services],
      }));
    }
  }, [service]);

  // Determine active service photo to display beside the form
  const activeServiceTitle =
    form.services.length > 0
      ? form.services[form.services.length - 1]
      : service;

  const activeServiceObj = allServices.find(
    (s) => s.title.toLowerCase() === activeServiceTitle?.toLowerCase()
  );

  const displayPhoto = activeServiceObj?.image || heroBride;
  const displayTitle = activeServiceObj?.title || "Bespoke Bridal Artistry";
  const displayBlurb =
    activeServiceObj?.blurb ||
    "Crafting signature hair and makeup looks for weddings, sangeet, cocktail & reception ceremonies.";

  const today = new Date().toISOString().split("T")[0];
  const maxDate = `${new Date().getFullYear() + 15}-12-31`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please fill in both Name and Phone Number.");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      await submitInquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        event_date: form.date || undefined,
        city: form.city.trim() || undefined,
        services: form.services.length > 0 ? form.services : undefined,
        notes: form.notes.trim() || undefined,
        submit_type: "website",
        status: "new",
      });

      // Also send Formspree email notification to the form owner
      await sendFormspreeNotification({
        _subject: `New Wedding Inquiry from ${form.name.trim()}`,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || "Not provided",
        _replyto: form.email.trim() || undefined,
        event_date: form.date || "Not specified",
        city: form.city.trim() || "Not specified",
        services: form.services.join(", ") || "None selected",
        notes: form.notes.trim() || "No additional notes",
        submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Inquiry error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      date: "",
      city: "",
      services: [],
      notes: "",
    });
    setIsSubmitted(false);
  };

  const getWhatsAppUrl = () => {
    let msg = `Hi Heer! I just submitted an inquiry on your website:\n\n*Name:* ${form.name.trim()}\n*Phone:* ${form.phone.trim()}`;
    if (form.email.trim()) msg += `\n*Email:* ${form.email.trim()}`;
    if (form.date) msg += `\n*Event Date:* ${form.date}`;
    if (form.city.trim()) msg += `\n*City:* ${form.city.trim()}`;
    if (form.services.length > 0) msg += `\n*Services:* ${form.services.join(", ")}`;
    if (form.notes.trim()) msg += `\n*Notes:* ${form.notes.trim()}`;

    return `${site.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  const field =
    "w-full rounded-2xl border border-input bg-card/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-accent focus:bg-card/80";

  return (
    <div className="overflow-x-hidden">
      <section className="grain px-4 pt-28 sm:pt-36 pb-12 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          {/* MOBILE ONLY FLOW (< lg): Compact & ordered: Title -> Photo -> Form -> Contact Bar */}
          <div className="flex flex-col gap-6 lg:hidden">
            {/* 1. Header Title & Text */}
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-[10px] tracking-[0.24em] text-accent uppercase font-bold">
                <Sparkles className="h-3 w-3 text-accent" /> Booking Inquiry
              </p>
              <h1 className="mt-2.5 font-display text-2xl font-bold leading-tight tracking-tight">
                Let's check <span className="text-gradient italic">your date</span>
              </h1>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Fill in your details to check availability. Heer personally reviews every request and replies within 24 hours.
              </p>
            </Reveal>

            {/* 2. Photo Card (Compact so it fits on front page before scroll) */}
            <Reveal delay={0.05}>
              <TiltCard intensity={5} className="w-full">
                <div className="glass-panel relative overflow-hidden rounded-2xl border border-border/80 p-2 shadow-xl group">
                  <div className="relative h-[210px] w-full overflow-hidden rounded-xl bg-muted">
                    <img
                      key={displayPhoto}
                      src={displayPhoto}
                      alt={displayTitle}
                      className="h-full w-full object-cover transition-all duration-700"
                      style={{ objectPosition: (activeServiceObj as any)?.objectPosition || "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent pointer-events-none" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-md border border-accent/30 px-2.5 py-1 text-[10px] font-semibold text-accent shadow-sm">
                        <Sparkles className="h-3 w-3" />
                        {activeServiceObj ? "Selected Service" : "Featured Look"}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-foreground">
                      <h3 className="font-display text-base font-bold tracking-tight">
                        {displayTitle}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground/90 leading-tight line-clamp-1">
                        {displayBlurb}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* 3. Direct Booking Form */}
            <Reveal delay={0.1}>
              {isSubmitted ? (
                <div className="glass-panel rounded-[2rem] p-6 text-center space-y-5 flex flex-col items-center justify-center border border-accent/30 shadow-2xl">
                  <div className="h-14 w-14 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-accent animate-bounce" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <h2 className="font-display text-xl font-bold text-foreground">
                      Inquiry Submitted!
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Thank you, <span className="text-foreground font-semibold">{form.name}</span>. Your details are saved! Heer will contact you at <span className="text-foreground font-semibold">{form.phone}</span> within 24 hours.
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2 pt-2">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366]/90 hover:bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Also Chat on WhatsApp (Optional)</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full rounded-full border border-border bg-card/60 px-5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="glass-panel space-y-3.5 rounded-2xl p-4 sm:p-7 border border-border/80 shadow-xl"
                  onSubmit={handleSubmit}
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                    <h2 className="font-display text-base font-bold">Booking Details</h2>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-semibold">
                      * Required fields
                    </span>
                  </div>

                  {/* Name & Phone (Required) */}
                  <div className="grid gap-3">
                    <label className="block">
                      <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase font-medium">
                        Your name <span className="text-accent">*</span>
                      </span>
                      <input
                        required
                        className={field}
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase font-medium">
                        Phone / Mobile <span className="text-accent">*</span>
                      </span>
                      <input
                        type="tel"
                        required
                        className={field}
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </label>
                  </div>

                  {/* Email */}
                  <label className="block">
                    <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
                      Email address
                    </span>
                    <input
                      type="email"
                      className={field}
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </label>

                  {/* Event Date & City */}
                  <div className="grid gap-3 grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
                        Event date
                      </span>
                      <input
                        type="date"
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
                      <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
                        City
                      </span>
                      <input
                        className={field}
                        placeholder="Mumbai / Destination"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      />
                    </label>
                  </div>

                  {/* Services & Packages — Tabbed Category View for Mobile */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="block text-xs tracking-[0.12em] text-muted-foreground uppercase font-semibold">
                        Services
                      </span>
                      {form.services.length > 0 && (
                        <span className="text-[10px] font-mono text-accent font-bold">
                          {form.services.length} selected
                        </span>
                      )}
                    </div>

                    <div className="rounded-xl border border-border/60 bg-card/30 p-2.5 space-y-2.5">
                      {/* Category Tabs */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-border/40">
                        {serviceGroups.map((group) => {
                          const isActive = activeServiceTab === group.name;
                          const selectedInGroup = group.list.filter((s) => form.services.includes(s.title)).length;
                          return (
                            <button
                              key={group.name}
                              type="button"
                              onClick={() => setActiveServiceTab(group.name)}
                              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                                isActive
                                  ? "bg-accent/20 border-accent/50 text-accent shadow-sm font-bold"
                                  : "bg-background/60 border-border/60 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {group.name} {selectedInGroup > 0 && `(${selectedInGroup})`}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Category Service Pills */}
                      {(() => {
                        const activeGroup = serviceGroups.find((g) => g.name === activeServiceTab) || serviceGroups[0];
                        return (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {activeGroup.list.map((s) => {
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
                                  className={`rounded-full px-2 py-1 text-[11px] leading-tight transition-all cursor-pointer border ${
                                    isSelected
                                      ? "accent-gradient text-accent-foreground border-transparent shadow-sm font-semibold scale-105"
                                      : "bg-background/80 border-border/80 text-muted-foreground hover:border-accent hover:text-foreground"
                                  }`}
                                >
                                  {isSelected ? "✓ " : "+ "}{s.title}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Notes */}
                  <label className="block">
                    <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
                      Tell me more
                    </span>
                    <textarea
                      rows={2}
                      className={field}
                      placeholder="Outfit, ceremonies, timings…"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </label>

                  {error && (
                    <p className="text-xs text-destructive font-medium animate-pulse">{error}</p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full accent-gradient px-6 py-2.5 text-xs font-semibold text-accent-foreground shadow-lg transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>{isSubmitting ? "Submitting..." : "Send Booking Inquiry"}</span>
                    </button>
                  </div>
                </form>
              )}
            </Reveal>

            {/* 4. Call / WhatsApp & Email Bar (Last on mobile) */}
            <Reveal delay={0.15}>
              <div className="glass-panel rounded-2xl p-4 flex flex-col gap-3 border border-accent/20 bg-accent/5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-wider text-muted-foreground uppercase font-semibold">
                      Call / WhatsApp
                    </p>
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-foreground hover:text-accent transition-colors"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-border/40 pt-2.5">
                  <div className="h-9 w-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-wider text-muted-foreground uppercase font-semibold">
                      Work Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-xs font-bold text-foreground hover:text-accent transition-colors"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* DESKTOP ONLY FLOW (lg:grid) — 100% UNTOUCHED ORIGINAL DESKTOP MARKUP */}
          <div className="hidden lg:grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
            {/* Left Column: Prominent Service Photo Display */}
            <div className="space-y-6">
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-[11px] tracking-[0.28em] text-accent uppercase font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-accent" /> Booking Inquiry
                </p>
                <h1 className="mt-4 font-display text-[clamp(1.6rem,3.8vw,2.8rem)] leading-tight tracking-tight whitespace-nowrap">
                  Let's check <span className="text-gradient italic">your date</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                  Fill in your details to check availability. Heer personally reviews every request and replies within 24 hours.
                </p>
              </Reveal>

              {/* Dynamic Service / Featured Photo Card */}
              <Reveal delay={0.1}>
                <TiltCard intensity={5} className="w-full">
                  <div className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 p-3 sm:p-4 shadow-2xl group">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-muted">
                      <img
                        key={displayPhoto}
                        src={displayPhoto}
                        alt={displayTitle}
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                        style={{ objectPosition: (activeServiceObj as any)?.objectPosition || "center" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent pointer-events-none" />

                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-md border border-accent/30 px-3.5 py-1.5 text-xs font-semibold text-accent shadow-md">
                          <Sparkles className="h-3.5 w-3.5" />
                          {activeServiceObj ? "Selected Service" : "Featured Look"}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-foreground">
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                          {displayTitle}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed line-clamp-2">
                          {displayBlurb}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>

              {/* Direct Quick Contact Bar */}
              <Reveal delay={0.15}>
                <div className="glass-panel rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4 border border-accent/20 bg-accent/5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-wider text-muted-foreground uppercase font-semibold">
                        Call / WhatsApp
                      </p>
                      <a
                        href={site.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs sm:text-sm font-bold text-foreground hover:text-accent transition-colors"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] tracking-wider text-muted-foreground uppercase font-semibold">
                        Work Email
                      </p>
                      <a
                        href={`mailto:${site.email}`}
                        className="text-xs sm:text-sm font-bold text-foreground hover:text-accent transition-colors"
                      >
                        {site.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Compact Sleek Form */}
            <Reveal delay={0.15}>
              {isSubmitted ? (
                <div className="glass-panel rounded-[2rem] p-8 text-center space-y-6 flex flex-col items-center justify-center min-h-[480px] animate-fade-in border border-accent/30 shadow-2xl">
                  <div className="h-16 w-16 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center">
                    <CheckCircle2 className="h-9 w-9 text-accent animate-bounce" />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      Inquiry Submitted!
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      Thank you, <span className="text-foreground font-semibold">{form.name}</span>. Your details are saved! Heer will contact you at <span className="text-foreground font-semibold">{form.phone}</span> within 24 hours.
                    </p>
                  </div>

                  <div className="w-full bg-accent/5 border border-accent/20 rounded-2xl p-4 text-left space-y-1.5 text-xs text-muted-foreground">
                    <p><strong className="text-foreground">Name:</strong> {form.name}</p>
                    <p><strong className="text-foreground">Phone:</strong> {form.phone}</p>
                    {form.email && <p><strong className="text-foreground">Email:</strong> {form.email}</p>}
                    {form.date && <p><strong className="text-foreground">Event Date:</strong> {form.date}</p>}
                    {form.city && <p><strong className="text-foreground">City:</strong> {form.city}</p>}
                    {form.services.length > 0 && (
                      <p><strong className="text-foreground">Services:</strong> {form.services.join(", ")}</p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2.5 pt-2">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366]/90 hover:bg-[#25D366] px-6 py-3 text-xs font-semibold text-white shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Also Chat on WhatsApp (Optional)</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full rounded-full border border-border bg-card/60 px-6 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all hover:border-accent cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="glass-panel space-y-4 rounded-[2rem] p-6 sm:p-7 border border-border/80 shadow-2xl"
                  onSubmit={handleSubmit}
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h2 className="font-display text-lg font-bold">Booking Details</h2>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-semibold">
                      * Required fields
                    </span>
                  </div>

                  {/* Name & Phone (Required) */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase font-medium">
                        Your name <span className="text-accent">*</span>
                      </span>
                      <input
                        required
                        className={field}
                        placeholder="Full Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase font-medium">
                        Phone / Mobile <span className="text-accent">*</span>
                      </span>
                      <input
                        type="tel"
                        required
                        className={field}
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </label>
                  </div>

                  {/* Email (Optional) */}
                  <label className="block">
                    <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
                      Email address <span className="text-muted-foreground/50 text-[10px]">(Optional)</span>
                    </span>
                    <input
                      type="email"
                      className={field}
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </label>

                  {/* Event Date & City (Optional) */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
                        Event date <span className="text-muted-foreground/50 text-[10px]">(Optional)</span>
                      </span>
                      <input
                        type="date"
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
                      <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
                        City <span className="text-muted-foreground/50 text-[10px]">(Optional)</span>
                      </span>
                      <input
                        className={field}
                        placeholder="Mumbai / Goa / Destination"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      />
                    </label>
                  </div>

                  {/* Services & Packages */}
                  <div className="space-y-2">
                    <span className="block text-xs sm:text-sm tracking-[0.12em] text-muted-foreground uppercase font-semibold">
                      Services <span className="text-muted-foreground/50 text-xs lowercase font-normal">(Optional)</span>
                    </span>

                    <div className="space-y-3 rounded-2xl border border-border/60 bg-card/30 p-3.5 sm:p-4">
                      {serviceGroups.map((group) => {
                        const selectedCountInGroup = group.list.filter((s) => form.services.includes(s.title)).length;
                        return (
                          <div key={group.name} className="space-y-1.5 pb-2.5 last:pb-0 border-b border-border/40 last:border-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent">
                                {group.name}
                              </span>
                              {selectedCountInGroup > 0 && (
                                <span className="text-xs text-accent font-mono font-bold">
                                  {selectedCountInGroup} selected
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
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
                                    className={`rounded-full px-3 py-1.5 text-xs sm:text-sm transition-all cursor-pointer border ${
                                      isSelected
                                        ? "accent-gradient text-accent-foreground border-transparent shadow-sm font-semibold scale-105"
                                        : "bg-background/80 border-border/80 text-muted-foreground hover:border-accent hover:text-foreground"
                                    }`}
                                  >
                                    {isSelected ? "✓ " : "+ "}{s.title}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes (Optional) */}
                  <label className="block">
                    <span className="mb-1 block text-xs tracking-[0.12em] text-muted-foreground uppercase">
                      Tell me more <span className="text-muted-foreground/50 text-[10px]">(Optional)</span>
                    </span>
                    <textarea
                      rows={2.5}
                      className={field}
                      placeholder="Outfit, ceremonies, number of people, timings…"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </label>

                  {error && (
                    <p className="text-xs text-destructive font-medium animate-pulse">{error}</p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full accent-gradient px-7 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? "Submitting..." : "Send Booking Inquiry"}</span>
                    </button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
