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
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
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
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ThreadsIcon className="h-4 w-4 text-accent" /> @{site.handle}
            </a>
            <a
              href={site.pinterest}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <PinterestIcon className="h-4 w-4 text-accent" /> {site.handle}
            </a>
            <div className="flex flex-wrap gap-3 pt-2 text-muted-foreground">
              <Link to="/services" className="hover:text-foreground">
                Services
              </Link>
              <Link to="/gallery" className="hover:text-foreground">
                Gallery
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
              <Link to="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} HEER DAGHA. All looks reserved.</span>
            <span className="hidden sm:inline text-muted-foreground/30">|</span>
            <Link to="/privacy" className="hover:text-foreground underline underline-offset-4">
              Privacy Policy
            </Link>
          </p>
          <p className="flex items-center gap-2">
            <span className="tracking-[0.2em] uppercase">Mumbai local time</span>
            <LocalClock />
          </p>
        </div>
      </div>
    </footer>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <title>Threads</title>
      <path d="M12.03 0C5.46 0 0 5.46 0 12.03c0 6.57 5.46 12.03 12.03 12.03 6.57 0 12.03-5.46 12.03-12.03S18.6 0 12.03 0zm5.12 14.59c-.43.91-1.06 1.63-1.89 2.16-.83.53-1.79.8-2.88.8-1.37 0-2.48-.41-3.34-1.22-.86-.81-1.29-1.92-1.29-3.32v-.18c0-1.41.43-2.52 1.3-3.33.87-.81 1.99-1.22 3.37-1.22 1.09 0 2.03.26 2.84.79.81.53 1.42 1.25 1.84 2.16.42.91.63 1.93.63 3.05v.23c0 1.11-.21 2.12-.63 3.03l-.15.33zm1.69-5.11c-.34-.95-.88-1.74-1.63-2.37-.75-.63-1.67-.95-2.76-.95-1.12 0-2.09.33-2.89.98-.8.65-1.34 1.54-1.63 2.66-.29 1.12-.44 2.39-.44 3.8v.1c0 1.41.15 2.67.44 3.79.29 1.12.83 2 1.63 2.65.8.65 1.77.98 2.89.98 1.12 0 2.05-.33 2.79-.98.74-.65 1.27-1.54 1.59-2.65.32-1.12.48-2.38.48-3.79v-.1c0-1.41-.16-2.68-.48-3.8l-.16-.34z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <title>Pinterest</title>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.164 0 7.397 2.967 7.397 6.93 0 4.136-2.607 7.464-6.22 7.464-1.215 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.621 0 11.985-5.367 11.985-11.987C23.97 5.39 18.592.02 12.017.02z" />
    </svg>
  );
}
