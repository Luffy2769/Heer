import bridalWeddingHair from "@/assets/Bridal_wedding_hair.webp";
import bridalHair from "@/assets/Bridal_hair.webp";
import sangeetLook from "@/assets/Sangeet_look.webp";
import haldiMehendi from "@/assets/Haldi_mehendi.webp";
import cocktail from "@/assets/Cocktail.webp";
import cocktail1 from "@/assets/Cocktail1.webp";
import matureLook from "@/assets/Mature_look.webp";
import noMakeupSoftGlam from "@/assets/No_makeup_soft_glam.webp";
import receptionHair from "@/assets/reception_hair.webp";
import engagementHair from "@/assets/engagement_hair.webp";
import allOccasions from "@/assets/all_occasions.webp";
import hdMakeup from "@/assets/HD_MAKEUP.webp";

const lookGroom = allOccasions;
const heroBride = bridalWeddingHair;

export const site = {
  name: "Heer Dagha",
  tagline: "Hair & Makeup Artistry",
  phone: "+91 9372040434",
  phoneHref: "tel:+919372040434",
  whatsapp: "https://wa.me/919372040434",
  email: "daghaheer02@gmail.com",
  instagram: "https://instagram.com/hairbyheerdagha",
  threads: "https://threads.net/@hairbyheerdagha",
  pinterest: "https://pinterest.com/hairbyheerdagha",
  handle: "hairbyheerdagha",
  location: "Mumbai, India",
};

export const stats = [
  { value: "4+", label: "Years experience" },
  { value: "1500+", label: "Happy faces" },
  { value: "250+", label: "Weddings & event stylist" },
  { value: "20+", label: "Destination states & cities" },
];

export const hairstylesList = [
  {
    title: "Wedding Hair",
    blurb:
      "Sculpted bridal buns embraced with fresh flowers, textured and voluminous hair for the D-day. Crafted to survive from pheras to vidaai, suitable for any weather.",
    image: bridalWeddingHair,
    objectPosition: "50% 30%",
  },
  {
    title: "Sangeet / Cocktail Hair",
    blurb:
      "Glossy blowouts, deep side waves and sleek high pony drama built for choreography and long dance sets.",
    image: cocktail1,
    objectPosition: "50% 35%",
  },
  {
    title: "Haldi / Mehndi Hair",
    blurb: "Fresh florals, textured plaits and breezy daytime styling for the intimate ceremonies.",
    image: haldiMehendi,
    objectPosition: "50% 25%",
  },
  {
    title: "Engagement Hair",
    blurb: "Elegant half-ups, classic waves and sophisticated styling for your ring ceremony look.",
    image: engagementHair,
    objectPosition: "50% 0%",
  },
  {
    title: "Reception Hair",
    blurb:
      "The statement finale — high-shine finishes, couture silhouettes and camera-ready polish.",
    image: receptionHair,
    objectPosition: "50% 0%",
  },
];

export const groomStylingList = [
  {
    title: "For All Occasions",
    blurb:
      "Sharp styles, clean textures and professional product placement for grooms on their big days.",
    image: allOccasions,
    objectPosition: "50% 25%",
  },
];

export const destinationList = [
  {
    title: "For Brides & Grooms Both",
    blurb:
      "Travel styling and makeup with humidity, salt-air and altitude planning. Full team and timeline coordination for destinations.",
    image: heroBride,
    objectPosition: "50% 25%",
  },
];

export const makeupList = [
  {
    title: "Soft Glam",
    blurb: "Minimal glow with dewy plump cheeks and lips chosen fresh for a full 13-hour stay.",
    image: noMakeupSoftGlam,
    objectPosition: "50% 15%",
  },
  {
    title: "3D / HD Makeup",
    blurb:
      "Highly defined cheekbones crafted for camera flash clarity, boosting the vibe for your cocktail night with a signature smokey effect.",
    image: hdMakeup,
    objectPosition: "50% 10%",
  },
  {
    title: "Mature Look",
    blurb: "Skin-first prep, sheer correction, freckles and features left intact.",
    image: matureLook,
    objectPosition: "50% 10%",
  },
];

// Keep legacy mappings to prevent breaking any files before they are updated
export const hairServices = hairstylesList;
export const makeupServices = makeupList;

export const reviews = [
  {
    name: "Aarohi Mehta",
    role: "Bride · Udaipur",
    quote:
      "Three ceremonies, three completely different looks, and not a single pin moved. Heer read my outfit better than I did.",
    rating: 5,
  },
  {
    name: "Sanya Kapoor",
    role: "Sangeet · Mumbai",
    quote:
      "I danced for four straight hours and my braid looked untouched in every reel. She is genuinely magic with texture.",
    rating: 5,
  },
  {
    name: "Rohan Shetty",
    role: "Groom · Goa",
    quote:
      "Didn't think grooms needed styling. The HD base and hair shape made my reception photos look like a magazine spread.",
    rating: 5,
  },
  {
    name: "Ishita Rane",
    role: "Reception · Mumbai",
    quote: "The 3D look was unreal on camera. My photographer asked who did my face — twice.",
    rating: 5,
  },
  {
    name: "Devika Nair",
    role: "Destination Bride · Alibaug",
    quote:
      "Sea humidity, an outdoor mandap, and my hair still had that glossy finish at midnight. Worth every rupee.",
    rating: 5,
  },
  {
    name: "Meher Sethi",
    role: "Mehendi · Pune",
    quote:
      "Calmest person in the room on my most chaotic morning. Also, the florals were stunning.",
    rating: 4,
  },
  {
    name: "Kritika Sen",
    role: "Sangeet · Delhi",
    quote:
      "Heer completely understood my vision of soft Hollywood waves. They survived all the dance choreography perfectly.",
    rating: 5,
  },
  {
    name: "Anjali Sharma",
    role: "Bride · Jaipur",
    quote:
      "The makeup was flawless and looked completely natural. Received countless compliments on my big day.",
    rating: 5,
  },
  {
    name: "Prisha Patel",
    role: "Cocktail · Mumbai",
    quote:
      "Absolutely loved my high ponytail look. Sleek, modern, and stayed put the entire night.",
    rating: 4,
  },
  {
    name: "Rhea Kapoor",
    role: "Mehendi · Goa",
    quote:
      "Beautiful braid styling with fresh flowers. Heer was so patient and calm despite the rush.",
    rating: 5,
  },
  {
    name: "Tanya Gill",
    role: "Reception · Chandigarh",
    quote:
      "Stunning editorial look with deep side waves. Heer has amazing attention to detail.",
    rating: 5,
  },
  {
    name: "Nisha Nair",
    role: "Haldi · Alibaug",
    quote:
      "Textured plait with marigold flowers. It was light, breezy, and matched the vibe perfectly.",
    rating: 4,
  },
  {
    name: "Vikram Malhotra",
    role: "Groom · Udaipur",
    quote:
      "Very subtle grooming. Didn't feel heavy, and looked sharp in all wedding videos.",
    rating: 5,
  },
  {
    name: "Ritu Varma",
    role: "Bride · Pune",
    quote:
      "Excellent hair engineering. The bun held my heavy dupatta without any pain or pulling.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Reception · Hyderabad",
    quote:
      "The HD base stood up perfectly to the high-temperature lighting. It looked like a second skin.",
    rating: 3,
  },
  {
    name: "Aditi Roy",
    role: "Sangeet · Kolkata",
    quote:
      "A glossy blowout that kept its bounce all night long. Highly recommend Heer!",
    rating: 5,
  },
  {
    name: "Meera Shah",
    role: "Bride · Lonavala",
    quote:
      "Heer is a magician. She managed to style both me and my mother in record time.",
    rating: 5,
  },
  {
    name: "Kabir Das",
    role: "Groom · Mumbai",
    quote:
      "Groom hair styling was exactly what I wanted. Natural volume that stayed neat all day.",
    rating: 4,
  },
  {
    name: "Pooja Hegde",
    role: "Engagement · Bangalore",
    quote:
      "Half-up styling with delicate braids. It was romantic, soft, and photographed beautifully.",
    rating: 5,
  },
  {
    name: "Siddharth Jain",
    role: "Groom · Jaipur",
    quote:
      "Clean texture, no sticky product build-up. Highly professional team.",
    rating: 3,
  },
  {
    name: "Divya Rao",
    role: "Bride · Chennai",
    quote:
      "She placed my traditional hair jewelry beautifully. It felt safe and snug through all the long rituals.",
    rating: 5,
  },
];

export const process = [
  {
    step: "01",
    title: "Inquiry",
    text: "Share the dates, cities and ceremonies. I check availability within 24 hours.",
  },
  {
    step: "02",
    title: "Trial",
    text: "We test silhouettes against your outfit, jewellery and face architecture.",
  },
  {
    step: "03",
    title: "Lock the look",
    text: "Timelines, kit list and travel plan finalised — no morning-of surprises.",
  },
  {
    step: "04",
    title: "Event day",
    text: "I arrive early, style calm, and stay for touch-ups where needed.",
  },
];
