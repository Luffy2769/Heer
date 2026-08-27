import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/motion-bits";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Heer Dagha Hair & Makeup Artistry" },
      {
        name: "description",
        content: "Privacy Policy for Heer Dagha Hair & Makeup Artistry in Mumbai, India.",
      },
      {
        name: "keywords",
        content: "Heer Dagha, Heer daga, her dagha, privacy policy",
      },
      { property: "og:title", content: "Privacy Policy — Heer Dagha" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://heerdagha.com/privacy" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="overflow-x-hidden">
      <section className="grain px-4 pt-36 pb-24 min-h-[70vh]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[0.95] text-gradient">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="mt-12 space-y-8 text-muted-foreground leading-relaxed text-sm">
              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">
                  1. Information We Collect
                </h2>
                <p>
                  We collect information that you directly provide to us when you make an inquiry,
                  book an appointment, or contact us. This may include your name, email address,
                  phone number, event details, and any other information you choose to share.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">
                  2. How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to respond to your inquiries, schedule and
                  manage appointments, provide our services, send updates, and communicate about our
                  styling/makeup offerings.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">
                  3. Data Security & Storage
                </h2>
                <p>
                  We take appropriate measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction. We do not sell or
                  rent your personal data to third parties.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">4. Cookies</h2>
                <p>
                  This website may use cookies and similar tracking technologies to enhance user
                  experience, analyze site traffic, and optimize performance.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-foreground mb-4">5. Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy, please contact us
                  via the contact details provided in the footer of this website.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
