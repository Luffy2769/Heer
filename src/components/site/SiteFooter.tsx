import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site-data";

function LocalClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm text-foreground tabular-nums">
      <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
      {now ?? "--:--:--"}
      <span className="text-muted-foreground">IST</span>
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="grain border-t border-border px-4 pt-16 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="font-display text-4xl text-gradient">Let's build your look.</h2>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Bridal, editorial and everyday styling for women and men — based in Mumbai, available
              wherever the celebration goes.
            </p>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full accent-gradient px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              Start an inquiry
            </a>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-[11px] tracking-[0.28em] text-accent uppercase">Contact</p>
            <a href={site.phoneHref} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4 text-accent" /> {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-4 w-4 text-accent" /> {site.email}
            </a>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" /> {site.location}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-[11px] tracking-[0.28em] text-accent uppercase">Elsewhere</p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Instagram className="h-4 w-4 text-accent" /> @{site.handle}
            </a>
            <a
              href={site.threads}
              target="_blank"
              rel="noreferrer"
              className="block text-muted-foreground hover:text-foreground"
            >
              Threads · @{site.handle}
            </a>
            <a
              href={site.pinterest}
              target="_blank"
              rel="noreferrer"
              className="block text-muted-foreground hover:text-foreground"
            >
              Pinterest · {site.handle}
            </a>
            <div className="flex flex-wrap gap-3 pt-2 text-muted-foreground">
              <Link to="/services" className="hover:text-foreground">
                Services
              </Link>
              <Link to="/reviews" className="hover:text-foreground">
                Review
              </Link>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
              <Link to="/inquiry" className="hover:text-foreground">
                Inquiry
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Heer Dagha. All looks reserved.</p>
          <p className="flex items-center gap-2">
            <span className="tracking-[0.2em] uppercase">Mumbai local time</span>
            <LocalClock />
          </p>
        </div>
      </div>
    </footer>
  );
}
