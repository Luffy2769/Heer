import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import DomeGallery from "@/components/site/DomeGallery";
import { Reveal } from "@/components/site/motion-bits";

import bridalHair from "@/assets/Bridal_hair.webp";
import bridalWeddingHair from "@/assets/Bridal_wedding_hair.webp";
import cocktail from "@/assets/Cocktail.webp";
import cocktail1 from "@/assets/Cocktail1.webp";
import cocktail2 from "@/assets/Cocktail2.webp";
import haldiMehendi from "@/assets/Haldi_mehendi.webp";
import img4384 from "@/assets/IMG_4384.webp";
import img6049 from "@/assets/IMG_6049.webp";
import img6318 from "@/assets/IMG_6318.webp";
import img6898 from "@/assets/IMG_6898.JPG.webp";
import img6925 from "@/assets/IMG_6925.webp";
import img7197 from "@/assets/IMG_7197.webp";
import img7376 from "@/assets/IMG_7376.JPG.webp";
import img7524 from "@/assets/IMG_7524.webp";
import img7668 from "@/assets/IMG_7668.webp";
import img7701 from "@/assets/IMG_7701.JPG.webp";
import img7960 from "@/assets/IMG_7960.webp";
import img8024 from "@/assets/IMG_8024.webp";
import img8045 from "@/assets/IMG_8045.webp";
import img9658 from "@/assets/IMG_9658.webp";
import img9729 from "@/assets/IMG_9729.webp";
import matureLook from "@/assets/Mature_look.webp";
import mehendiHair from "@/assets/Mehendi_hair.webp";
import noMakeupSoftGlam from "@/assets/No_makeup_soft_glam.webp";
import sangeetLook from "@/assets/Sangeet_look.webp";
import weddingHair from "@/assets/Wedding_hair.webp";
import receptionHair from "@/assets/reception_hair.webp";
import engagementHair from "@/assets/engagement_hair.webp";
import allOccasions from "@/assets/all_occasions.webp";
import hdMakeup from "@/assets/HD_MAKEUP.webp";
import img0757 from "@/assets/IMG_0757.JPG.webp";
import img2618 from "@/assets/IMG_2618.webp";
import img2907 from "@/assets/IMG_2907.webp";
import img3136 from "@/assets/IMG_3136.webp";
import img8531 from "@/assets/IMG_8531.webp";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title:
          "Lookbook Gallery — Heer Dagha | Best Hair Artist in Andheri, Bandra, Churchgate & Mumbai",
      },
      {
        name: "description",
        content:
          "View the signature hair styling & makeup portfolio by Heer Dagha. Featuring stunning bridal buns, glam cocktail waves, birthday party styles & ceremony looks across Andheri, Bandra, Churchgate & Mumbai.",
      },
      {
        name: "keywords",
        content:
          "Heer Dagha, Heer daga, her dagha, her daga, heer daha, heee dagha, heee daga, Makeup artists, Hair artist, Best hair artist in Andheri, Best hair artist in Bandra, Best hair artist in mumbai, Best hair artist in churchgate, Best hair artist in India, bridal hair portfolio, sangeet lookbook, cocktail hairstyle photos Mumbai",
      },
      {
        property: "og:title",
        content: "Lookbook Gallery — Heer Dagha, Premier Hair Artist in Mumbai",
      },
      {
        property: "og:description",
        content:
          "Browse the interactive lookbook of custom hairstyles, soft glam & HD makeup looks by Heer Dagha in Mumbai.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://heerdagha.com/gallery" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

const galleryImages = [
  { src: hdMakeup, alt: "3D / HD Makeup look", objectPosition: "50% 15%" },
  { src: img7376, alt: "Client hair & makeup glam", objectPosition: "50% 15%" },
  { src: receptionHair, alt: "Reception statement hair", objectPosition: "50% 35%" },
  { src: engagementHair, alt: "Engagement half-up hair", objectPosition: "50% 25%" },
  { src: allOccasions, alt: "Special occasion styling", objectPosition: "50% 10%" },
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
  { src: img0757, alt: "Bridal hair detailing", objectPosition: "50% 15%" },
  { src: img2618, alt: "Client hair glam", objectPosition: "50% 15%" },
  { src: img2907, alt: "Signature hair waves", objectPosition: "50% 15%" },
  { src: img3136, alt: "Bridal client portrait", objectPosition: "50% 15%" },
  { src: img8531, alt: "Soft glam hairstyle", objectPosition: "50% 15%" },
  { src: img6898, alt: "Textured sangeet curls" },
  { src: img6925, alt: "Sleek cocktail style" },
  { src: img7701, alt: "Engagement hair styling" },
  { src: img4384, alt: "Royal bridal look" },
  { src: img6049, alt: "Elegant detailed braid" },
  { src: img6318, alt: "Sangeet hairstyle" },
  { src: img7197, alt: "Contemporary bridal look" },
  { src: img7524, alt: "Haldi ceremony style" },
  { src: img7668, alt: "Cocktail glam waves" },
  { src: img7960, alt: "Couture wedding hair" },
  { src: img8024, alt: "Signature hair artistry" },
  { src: img8045, alt: "Soft texture waves" },
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
