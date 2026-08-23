import { createFileRoute } from "@tanstack/react-router";
import DomeGallery from "@/components/site/DomeGallery";
import { Reveal } from "@/components/site/motion-bits";

import lookSoftGlam from "@/assets/look-softglam.jpg";
import lookCocktail from "@/assets/look-cocktail.jpg";
import lookHaldi from "@/assets/look-haldi.jpg";
import lookGroom from "@/assets/look-groom.jpg";
import img6002 from "@/assets/IMG_6002.JPG.jpeg";
import img6898 from "@/assets/IMG_6898.JPG.jpeg";
import img6901 from "@/assets/IMG_6901.JPG.jpeg";
import img6925 from "@/assets/IMG_6925.JPG.jpeg";
import img6926 from "@/assets/IMG_6926.JPG.jpeg";
import img7094 from "@/assets/IMG_7094.JPG.jpeg";
import img7700 from "@/assets/IMG_7700.JPG.jpeg";
import img7701 from "@/assets/IMG_7701.JPG.jpeg";
import img7704 from "@/assets/IMG_7704.JPG.jpeg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Lookbook Gallery — Heer Dagha, Mumbai" },
      {
        name: "description",
        content: "Explore the 3D lookbook of client hairstyles, cuts, groom styling, and makeup looks curated by Heer Dagha.",
      },
      { property: "og:title", content: "Lookbook Gallery — Heer Dagha" },
      {
        property: "og:description",
        content: "Browse the interactive 3D lookbook of custom hairstyles and bridal makeup looks by Heer Dagha.",
      },
    ],
  }),
  component: GalleryPage,
});

const galleryImages = [
  { src: lookCocktail, alt: "Cocktail waves" },
  { src: lookSoftGlam, alt: "Soft glam" },
  { src: lookHaldi, alt: "Haldi florals" },
  { src: lookGroom, alt: "Groom styling" },
  { src: img6002, alt: "Bridal waves" },
  { src: img6898, alt: "Sangeet curls" },
  { src: img6901, alt: "Soft glam makeup" },
  { src: img6925, alt: "Cocktail hairstyle" },
  { src: img6926, alt: "Traditional bun" },
  { src: img7094, alt: "Reception look" },
  { src: img7700, alt: "Classic curls" },
  { src: img7701, alt: "Engagement makeup" },
  { src: img7704, alt: "Haldi styling" },
];

function GalleryPage() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-background">
      <section className="grain relative flex flex-col items-center justify-center px-4 pt-36 pb-20 w-full">
        <div className="mx-auto max-w-6xl w-full text-center">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Portfolio</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-gradient italic">
              Lookbook Gallery
            </h1>
            <p className="mt-4 mx-auto max-w-xl text-sm text-muted-foreground">
              Drag or swipe to spin the 3D dome and tap on any photo to examine the details, braids, and finishes.
            </p>
          </Reveal>
        </div>

        {/* 3D Gallery Frame */}
        <Reveal className="w-full mt-10" delay={0.15}>
          <div 
            style={{ width: "100%", height: "70vh", minHeight: "500px", position: "relative" }} 
            className="w-full overflow-hidden rounded-3xl border border-border bg-card/25"
          >
            <DomeGallery
              images={galleryImages}
              fit={0.8}
              minRadius={900}
              maxVerticalRotationDeg={0}
              segments={34}
              dragDampening={4.2}
              grayscale={false}
              overlayBlurColor="var(--background)"
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
