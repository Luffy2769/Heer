import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import logoImg from "@/assets/Logo.png";

/* ── Inline SVG brand icons ───────────────────────────── */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconThreads() {
  return (
    <svg viewBox="0 0 192 192" fill="currentColor" className="size-5">
      <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.206 17.11 97.015 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.28 0h-.429C68.977.195 47.43 9.6 32.908 27.94 19.952 44.481 13.223 67.908 13 96c.223 28.092 6.952 51.519 19.908 68.06C47.43 182.4 68.977 191.805 96.851 192h.429c24.695-.169 42.089-6.71 56.446-21.061 18.723-18.703 18.144-42.227 11.967-56.623-4.8-11.189-14.108-20.065-25.156-25.328zm-44.132 52.573c-10.426.584-21.24-4.097-21.795-14.169-.418-7.819 5.571-16.533 23.715-17.561 2.073-.12 4.109-.176 6.113-.176 6.033 0 11.679.573 16.848 1.67-1.917 23.698-14.997 29.712-24.881 30.236z" />
    </svg>
  );
}

function IconPinterest() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/hairbyheerdagha",
    Icon: IconInstagram,
    colorClass: "hover:text-pink-600 hover:border-pink-300",
    label: "@hairbyheerdagha",
  },
  {
    name: "Threads",
    href: "https://www.threads.net/@hairbyheerdagha",
    Icon: IconThreads,
    colorClass: "hover:text-accent hover:border-accent/40",
    label: "@hairbyheerdagha",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/hairbyheerdagha",
    Icon: IconPinterest,
    colorClass: "hover:text-red-600 hover:border-red-300",
    label: "hairbyheerdagha",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919372040434",
    Icon: IconWhatsApp,
    colorClass: "hover:text-emerald-600 hover:border-emerald-400",
    label: "+91 93720 40434",
  },
];

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent">
      <Clock className="size-3.5 text-accent animate-pulse" />
      {time ? `${time} IST (Mumbai)` : "Loading IST..."}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground relative overflow-hidden">
      {/* Ambient subtle glow matching home page */}
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-accent/5 blur-3xl" />

      {/* Main Footer Links & Info */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-2">
          <Link
            to="/"
            className="-ml-1 flex items-center gap-2.5 sm:gap-3.5 hover:opacity-90 transition-opacity"
          >
            <img
              src={logoImg}
              alt="Heer Dagha"
              className="h-12 sm:h-16 w-auto object-contain"
            />
            <span className="font-display text-2xl sm:text-3xl uppercase tracking-[0.22em] font-bold text-foreground">
              Heer Dagha
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
            Premier Hair Artist &amp; Makeup Specialist based in Mumbai, India. Crafting bespoke bridal, cocktail, sangeet, haldi, reception looks &amp; draping services for both women and men.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
              <MapPin className="size-4 text-accent" />
              <span>Mumbai, India (Pan-India &amp; Destination)</span>
            </div>
          </div>
        </div>

        {/* Phone side-by-side wrapper: Direct Contact (Left) & Navigation (Right) */}
        <div className="grid grid-cols-2 gap-6 md:contents">
          {/* Direct Contact Info & Live Clock (Left on Phone, Column 4 on Desktop) */}
          <div className="space-y-4 order-1 md:order-2">
            <h4 className="font-display text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <a
                href="tel:+919372040434"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone className="size-4 text-accent shrink-0" />
                <span className="font-mono text-xs sm:text-sm">+91 93720 40434</span>
              </a>
              <a
                href="mailto:daghaheer02@gmail.com"
                className="flex items-center gap-2 hover:text-accent transition-colors break-all"
              >
                <Mail className="size-4 text-accent shrink-0" />
                <span className="text-[11px] sm:text-xs">daghaheer02@gmail.com</span>
              </a>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-1">
                Local Studio Time
              </div>
              <LiveClock />
            </div>
          </div>

          {/* Quick Links / Navigation (Right on Phone, Column 3 on Desktop) */}
          <div className="space-y-3 order-2 md:order-1">
            <h4 className="font-display text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-[0.2em]">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-accent transition-colors">
                  Review
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/inquiry" className="text-muted-foreground hover:text-accent transition-colors">
                  Inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Strip at Bottom */}
      <div className="border-t border-border py-4 sm:py-6 px-4 sm:px-6 lg:px-8 bg-card/40">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-muted-foreground">
            <span>Connect &amp; Follow</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {socialLinks.map(({ name, href, Icon, colorClass, label }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${name} — ${label}`}
                title={label}
                className={`group flex items-center justify-center gap-2 rounded-full border border-border bg-background p-2.5 sm:px-4 sm:py-2 text-xs text-muted-foreground shadow-sm transition-all duration-300 ${colorClass} hover:bg-accent/10 hover:-translate-y-0.5`}
              >
                <Icon />
                <span className="hidden sm:inline font-medium tracking-wide">{name}</span>
                <ArrowUpRight className="hidden sm:block size-3 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-6 px-6 lg:px-8 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4 mx-auto max-w-7xl">
        <p className="order-1 sm:order-none">
          © {new Date().getFullYear()} Heer Dagha Hair &amp; Beauty Artistry. All Rights Reserved.
        </p>

        <p className="text-[10px] uppercase tracking-widest text-accent font-semibold order-2 sm:order-last">
          4+ Years Experience • 1500+ Happy Faces
        </p>

        <p className="text-[11px] text-muted-foreground/50 font-normal order-3 sm:order-none">
          Designed &amp; Developed by{" "}
          <a
            href="https://rootcrypt.in"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-muted-foreground/75 hover:text-accent transition-colors"
          >
            RootCrypt
          </a>
        </p>
      </div>
    </footer>
  );
}

export { Footer as SiteFooter };
