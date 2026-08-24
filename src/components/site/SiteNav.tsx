import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/site-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/reviews", label: "Review" },
  { to: "/about", label: "About" },
  { to: "/inquiry", label: "Inquiry" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass-panel" : "border border-transparent"
        }`}
      >
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full accent-gradient font-brand text-xl font-bold text-accent-foreground">
            H
          </span>
          <span className="leading-tight">
            <span className="block font-brand text-[17px] font-semibold tracking-widest text-foreground uppercase">
              {site.name}
            </span>
            <span className="block text-[9px] tracking-[0.28em] text-muted-foreground uppercase mt-0.5">
              {site.tagline}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground [&.active]:text-accent"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full accent-gradient px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            Book a date
          </a>
        </div>

        <button
          className="rounded-full border border-border p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-panel mx-auto mt-2 max-w-6xl rounded-3xl p-4 md:hidden"
          >
            <ul className="grid gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl text-foreground [&.active]:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block rounded-2xl accent-gradient px-4 py-3 text-center font-semibold text-accent-foreground"
            >
              Book a date
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
