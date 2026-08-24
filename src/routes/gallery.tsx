import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import DomeGallery from "@/components/site/DomeGallery";
import { Reveal } from "@/components/site/motion-bits";

import bridalHair from "@/assets/Bridal_hair.jpeg";
import bridalWeddingHair from "@/assets/Bridal_wedding_hair.jpeg";
import cocktail from "@/assets/Cocktail.jpeg";
import cocktail1 from "@/assets/Cocktail1.jpeg";
import cocktail2 from "@/assets/Cocktail2.jpeg";
import eventJpg from "@/assets/Event.jpg";
import event1 from "@/assets/Event1.jpeg";
import event2 from "@/assets/Event2.jpeg";
import haldiMehendi from "@/assets/Haldi_mehendi.jpeg";
import img4384 from "@/assets/IMG_4384.JPG";
import img6049 from "@/assets/IMG_6049.JPG";
import img6059 from "@/assets/IMG_6059.JPG";
import img6318 from "@/assets/IMG_6318.JPG";
import img6319 from "@/assets/IMG_6319.JPG";
import img6324 from "@/assets/IMG_6324.JPG";
import img6898 from "@/assets/IMG_6898.JPG.jpeg";
import img6901 from "@/assets/IMG_6901.JPG.jpeg";
import img6925 from "@/assets/IMG_6925.JPG.jpeg";
import img6926 from "@/assets/IMG_6926.JPG.jpeg";
import img7197 from "@/assets/IMG_7197.JPG";
import img7524 from "@/assets/IMG_7524.JPG";
import img7668 from "@/assets/IMG_7668.JPG";
import img7672 from "@/assets/IMG_7672.JPG";
import img7701 from "@/assets/IMG_7701.JPG.jpeg";
import img7704 from "@/assets/IMG_7704.JPG.jpeg";
import img7750 from "@/assets/IMG_7750.JPG";
import img7957 from "@/assets/IMG_7957.JPG";
import img7960 from "@/assets/IMG_7960.JPG";
import img8024 from "@/assets/IMG_8024.JPG";
import img8045 from "@/assets/IMG_8045.JPG";
import img8282 from "@/assets/IMG_8282.JPG";
import img8284 from "@/assets/IMG_8284.jpg";
import img9658 from "@/assets/IMG_9658.jpg";
import img9729 from "@/assets/IMG_9729.jpg";
import matureLook from "@/assets/Mature_look.jpeg";
import mehendiHair from "@/assets/Mehendi_hair.jpeg";
import noMakeupSoftGlam from "@/assets/No_makeup_soft_glam.jpeg";
import sangeetLook from "@/assets/Sangeet_look.jpeg";
import weddingHair from "@/assets/Wedding_hair.jpeg";
import heerAbout from "@/assets/heer_about.jpeg";
import heerHome from "@/assets/heer_home.jpeg";

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
  { src: heerHome, alt: "Editorial bridal portrait", objectPosition: "50% 15%" },
  { src: bridalWeddingHair, alt: "Wedding hair artistry", objectPosition: "50% 20%" },
  { src: bridalHair, alt: "Bridal waves & texture", objectPosition: "50% 15%" },
  { src: sangeetLook, alt: "Sangeet glam waves", objectPosition: "50% 20%" },
  { src: haldiMehendi, alt: "Haldi floral styling", objectPosition: "50% 20%" },
  { src: mehendiHair, alt: "Mehndi braided hair", objectPosition: "50% 15%" },
  { src: cocktail, alt: "Cocktail sleek glam", objectPosition: "50% 10%" },
  { src: cocktail1, alt: "Cocktail Hollywood waves", objectPosition: "50% 20%" },
  { src: cocktail2, alt: "High-shine reception hair", objectPosition: "50% 15%" },
  { src: noMakeupSoftGlam, alt: "Soft glam finish", objectPosition: "50% 15%" },
  { src: matureLook, alt: "Mature look elegance", objectPosition: "50% 10%" },
  { src: weddingHair, alt: "Classic bridal updo", objectPosition: "50% 15%" },
  { src: event1, alt: "Grand wedding styling", objectPosition: "50% 20%" },
  { src: event2, alt: "Reception couture look", objectPosition: "50% 20%" },
  { src: eventJpg, alt: "Celebration hair glam", objectPosition: "50% 15%" },
  { src: heerAbout, alt: "Heer Dagha artistry", objectPosition: "50% 10%" },
  { src: img6898, alt: "Textured sangeet curls" },
  { src: img6901, alt: "Glowy soft glam makeup" },
  { src: img6925, alt: "Sleek cocktail style" },
  { src: img6926, alt: "Traditional bridal bun" },
  { src: img7701, alt: "Engagement hair styling" },
  { src: img7704, alt: "Daytime haldi look" },
  { src: img4384, alt: "Royal bridal look" },
  { src: img6049, alt: "Elegant detailed braid" },
  { src: img6059, alt: "Textured updo design" },
  { src: img6318, alt: "Sangeet hairstyle" },
  { src: img6319, alt: "Bridal glam detail" },
  { src: img6324, alt: "Statement hair waves" },
  { src: img7197, alt: "Contemporary bridal look" },
  { src: img7524, alt: "Haldi ceremony style" },
  { src: img7668, alt: "Cocktail glam waves" },
  { src: img7672, alt: "Intimate function style" },
  { src: img7750, alt: "Glamour hair finish" },
  { src: img7957, alt: "Fresh bridal glow" },
  { src: img7960, alt: "Couture wedding hair" },
  { src: img8024, alt: "Signature hair artistry" },
  { src: img8045, alt: "Soft texture waves" },
  { src: img8282, alt: "Reception glow" },
  { src: img8284, alt: "Breezy daytime waves" },
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
              Tap to open any image
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
