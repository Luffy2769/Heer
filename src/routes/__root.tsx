import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportAppError } from "../lib/error-reporting";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportAppError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          "Heer Dagha — Best Hair Artist & Makeup Artist in Mumbai | Andheri, Bandra, Churchgate",
      },
      {
        name: "description",
        content:
          "Heer Dagha is Mumbai's leading hair artist & bridal makeup stylist. Specializing in flawless hair styling & soft glam makeup for weddings, sangeet, cocktail parties, birthday functions & club nights in Andheri, Bandra, Churchgate & destination weddings.",
      },
      {
        name: "keywords",
        content:
          "Heer Dagha, Heer daga, her dagha, her daga, heer daha, heee dagha, heee daga, hair by heer dagha, Makeup artists, Hair artist, Best hair artist in Andheri, Best hair artist in Bandra, Best hair artist in mumbai, Best hair artist in churchgate, Best hair artist in India, bridal makeup artist Mumbai, sangeet hair stylist, cocktail party makeup, birthday party makeup artist, club night hair styling Mumbai",
      },
      { name: "author", content: "Heer Dagha" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: "Heer Dagha Hair & Makeup Artistry" },
      { property: "og:title", content: "Heer Dagha — Premier Hair Artist & Makeup Stylist in Mumbai" },
      {
        property: "og:description",
        content:
          "Flawless bridal hair, soft glam makeup, sangeet blowouts & cocktail styling across Andheri, Bandra, Churchgate, Mumbai & destination weddings across India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://heerdagha.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Heer Dagha — Best Hair Artist & Makeup Artist in Mumbai" },
      {
        name: "twitter:description",
        content:
          "1500+ happy faces. Expert hair styling & makeup for weddings, sangeets, cocktail nights & birthday parties in Mumbai.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://heerdagha.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Manrope:wght@300..700&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Cinzel:wght@400;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["BeautySalon", "LocalBusiness", "Person"],
    name: "Heer Dagha Hair & Makeup Artistry",
    alternateName: [
      "Heer Dagha",
      "Heer daga",
      "her dagha",
      "her daga",
      "heer daha",
      "heee dagha",
      "heee daga",
      "Hair by Heer Dagha",
    ],
    image: "https://heerdagha.com/Logo_Site.png",
    "@id": "https://heerdagha.com",
    url: "https://heerdagha.com",
    telephone: "+919372040434",
    email: "daghaheer02@gmail.com",
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.1197,
      longitude: 72.8464,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Andheri, Mumbai" },
      { "@type": "AdministrativeArea", name: "Bandra, Mumbai" },
      { "@type": "AdministrativeArea", name: "Churchgate, Mumbai" },
      { "@type": "AdministrativeArea", name: "Juhu, Mumbai" },
      { "@type": "AdministrativeArea", name: "South Mumbai" },
      { "@type": "AdministrativeArea", name: "Mumbai Suburban" },
      { "@type": "AdministrativeArea", name: "Navi Mumbai" },
      { "@type": "AdministrativeArea", name: "Goa" },
      { "@type": "AdministrativeArea", name: "Udaipur" },
      { "@type": "AdministrativeArea", name: "Jaipur" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
    sameAs: [
      "https://instagram.com/hairbyheerdagha",
      "https://threads.net/@hairbyheerdagha",
      "https://pinterest.com/hairbyheerdagha",
    ],
    knowsAbout: [
      "Bridal Hair Styling",
      "Soft Glam Makeup",
      "3D and HD Makeup",
      "Sangeet & Cocktail Hairstyles",
      "Haldi & Mehendi Styling",
      "Birthday Party Makeup",
      "Club Night Styling",
      "Destination Wedding Styling",
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* Google Analytics 4 (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QVQ61GWBV6"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QVQ61GWBV6');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
