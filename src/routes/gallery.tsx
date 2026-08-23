import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
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
import img4220 from "@/assets/IMG_4220.jpg";
import img4384 from "@/assets/IMG_4384.jpg";
import img6049 from "@/assets/IMG_6049.jpg";
import img6051 from "@/assets/IMG_6051.jpg";
import img6059 from "@/assets/IMG_6059.jpg";
import img6180 from "@/assets/IMG_6180.jpg";
import img6318 from "@/assets/IMG_6318.jpg";
import img6319 from "@/assets/IMG_6319.jpg";
import img6324 from "@/assets/IMG_6324.jpg";
import img7193 from "@/assets/IMG_7193.jpg";
import img7524 from "@/assets/IMG_7524.jpg";
import img7668 from "@/assets/IMG_7668.jpg";
import img8024 from "@/assets/IMG_8024.jpg";
import img8282 from "@/assets/IMG_8282.jpg";
import img9658 from "@/assets/IMG_9658.jpg";
import img9729 from "@/assets/IMG_9729.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Lookbook Gallery — Heer Dagha, Mumbai" },
      {
        name: "description",
        content:
          "Explore the 3D lookbook of client hairstyles, cuts, groom styling, and makeup looks curated by Heer Dagha.",
      },
      { property: "og:title", content: "Lookbook Gallery — Heer Dagha" },
      {
        property: "og:description",
        content:
          "Browse the interactive 3D lookbook of custom hairstyles and bridal makeup looks by Heer Dagha.",
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
  { src: img4220, alt: "Bridal hair detailing" },
  { src: img4384, alt: "Royal bridal look" },
  { src: img6049, alt: "Elegant braid" },
  { src: img6051, alt: "High-fashion hair" },
  { src: img6059, alt: "Textured updo" },
  { src: img6180, alt: "Glam hairstyle" },
  { src: img6318, alt: "Sangeet hairstyle" },
  { src: img6319, alt: "Bridal glam detail" },
  { src: img6324, alt: "Statement waves" },
  { src: img7193, alt: "Soft glam finish" },
  { src: img7524, alt: "Haldi look" },
  { src: img7668, alt: "Cocktail glam" },
  { src: img8024, alt: "Hair artistry" },
  { src: img8282, alt: "Reception glow" },
  { src: img9658, alt: "Bridal hair design" },
  { src: img9729, alt: "Flawless HD glam" },
];

function GalleryPage() {
  const [minRadius, setMinRadius] = useState(950);
  const [segments, setSegments] = useState(34);
  const [height, setHeight] = useState("58vh");
  const [minHeight, setMinHeight] = useState("420px");
  const [openedWidth, setOpenedWidth] = useState("100%");
  const [openedHeight, setOpenedHeight] = useState("100%");
  const [openedRadius, setOpenedRadius] = useState("1.5rem");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMinRadius(1050); // Keep radius moderate to preserve curvature
        setSegments(26);    // Reduce segments to widen columns and make image boxes larger on PC
        setHeight("78vh");  // Tall height on PC is fine (users scroll with mouse wheel/scrollbars)
        setMinHeight("600px");
        setOpenedWidth("400px"); // Keep original square size on PC
        setOpenedHeight("400px");
        setOpenedRadius("30px");
      } else {
        setMinRadius(900);  // Mobile radius
        setSegments(34);    // Mobile segments density
        setHeight("58vh");  // Slightly taller mobile height, but still scrollable around it
        setMinHeight("420px");
        setOpenedWidth("100%"); // Take whole component container size on mobile
        setOpenedHeight("100%");
        setOpenedRadius("1.5rem");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              Drag or swipe to spin the 3D dome and tap on any photo to examine the details, braids,
              and finishes.
            </p>
          </Reveal>
        </div>

        {/* 3D Gallery Frame */}
        <Reveal className="w-full mt-10" delay={0.15}>
          <div
            style={{ width: "100%", height: height, minHeight: minHeight, position: "relative" }}
            className="w-full overflow-hidden rounded-3xl border border-border bg-card/25"
          >
            <DomeGallery
              images={galleryImages}
              fit={1.18}
              minRadius={minRadius}
              maxVerticalRotationDeg={0}
              segments={segments}
              dragDampening={4.2}
              grayscale={false}
              overlayBlurColor="var(--background)"
              openedImageWidth={openedWidth}
              openedImageHeight={openedHeight}
              openedImageBorderRadius={openedRadius}
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}

