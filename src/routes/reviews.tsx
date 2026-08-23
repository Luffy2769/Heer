import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { reviews, stats } from "@/lib/site-data";
import { Reveal, TiltCard } from "@/components/site/motion-bits";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What Brides & Grooms Say | Heer Dagha" },
      {
        name: "description",
        content:
          "Real words from brides, grooms and guests styled by Heer Dagha across Mumbai, Goa, Udaipur and destination weddings.",
      },
      { property: "og:title", content: "Reviews — What Brides & Grooms Say | Heer Dagha" },
      {
        property: "og:description",
        content: "1000+ happy faces and counting. Read the reviews from Heer Dagha's clients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  const [localReviews, setLocalReviews] = useState<
    Array<{ name: string; role: string; quote: string; rating?: number }>
  >(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("heer_reviews");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [];
  });

  const [dbReviews, setDbReviews] = useState<
    Array<{ id?: string; name: string; role: string; quote: string; rating?: number }>
  >([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true") {
        setIsAdmin(true);
      }
    }

    if (!isSupabaseConfigured) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase!
          .from("reviews")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) {
          setDbReviews(data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newReview = {
      name: name.trim(),
      role: role.trim() || "Client",
      quote: quote.trim() || "Amazing experience and beautiful results!",
      rating,
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase!.from("reviews").insert([newReview]).select();

        if (error) throw error;
        if (data) {
          setDbReviews((prev) => [data[0], ...prev]);
        }
      } catch (err) {
        console.error("Error inserting review:", err);
        alert("Failed to submit review to database. Please check connection.");
      }
    } else {
      const updated = [newReview, ...localReviews];
      setLocalReviews(updated);
      localStorage.setItem("heer_reviews", JSON.stringify(updated));
    }

    // Reset Form
    setName("");
    setRole("");
    setQuote("");
    setRating(5);
    setIsOpen(false);
  };

  const handleDeleteReview = async (review: {
    id?: string;
    name: string;
    role: string;
    quote: string;
    rating?: number;
  }) => {
    if (isSupabaseConfigured && review.id) {
      try {
        const { error } = await supabase!.from("reviews").delete().eq("id", review.id);

        if (error) throw error;
        setDbReviews((prev) => prev.filter((r) => r.id !== review.id));
      } catch (err) {
        console.error("Error deleting review:", err);
        alert("Failed to delete review from database.");
      }
    } else {
      const updated = localReviews.filter(
        (lr) => !(lr.name === review.name && lr.quote === review.quote),
      );
      setLocalReviews(updated);
      localStorage.setItem("heer_reviews", JSON.stringify(updated));
    }
  };

  const mergedReviews = isSupabaseConfigured
    ? dbReviews.length > 0
      ? dbReviews
      : reviews
    : [...localReviews, ...reviews];

  const [currentPage, setCurrentPage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const reviewsPerPage = 15;
  const initialVisibleReviews = 6;

  const totalPages = Math.ceil(mergedReviews.length / reviewsPerPage);
  const currentPageReviews = mergedReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage,
  );
  const visibleReviews = isExpanded
    ? currentPageReviews
    : currentPageReviews.slice(0, initialVisibleReviews);

  const showReadMore = !isExpanded && currentPageReviews.length > initialVisibleReviews;

  const handlePageChange = (pageIdx: number) => {
    setCurrentPage(pageIdx);
    setIsExpanded(false);
    const gridSection = document.getElementById("reviews-grid-section");
    if (gridSection) {
      gridSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const field =
    "w-full rounded-2xl border border-input bg-card/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-accent";

  return (
    <div className="overflow-x-hidden">
      <section className="grain px-4 pt-36 pb-10">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Review</p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]">
                1000+ faces, <span className="text-gradient italic">one standard</span>
              </h1>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="rounded-full accent-gradient px-7 py-3.5 font-semibold text-accent-foreground shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Add a review
                </button>
              </DialogTrigger>
              <DialogContent className="glass-panel text-foreground border-border max-w-md p-6 rounded-3xl md:p-8">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl text-gradient">
                    Share your experience
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-xs mt-1">
                    Your feedback helps us continue styling flawless looks.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-1.5">
                    <span className="block text-[11px] tracking-wider text-muted-foreground uppercase">
                      Rating *
                    </span>
                    <div className="flex items-center gap-1.5 py-1">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const starValue = idx + 1;
                        const isLit =
                          hoverRating !== null ? starValue <= hoverRating : starValue <= rating;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="cursor-pointer transition-transform hover:scale-115 text-accent focus:outline-none bg-transparent border-0 p-0"
                          >
                            <Star
                              className={`h-7 w-7 ${isLit ? "fill-current" : "text-muted-foreground/30"}`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label className="block space-y-1.5">
                    <span className="block text-[11px] tracking-wider text-muted-foreground uppercase">
                      Your name *
                    </span>
                    <input
                      required
                      placeholder="Enter your name"
                      className={field}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="block text-[11px] tracking-wider text-muted-foreground uppercase">
                      Role / Event (Optional)
                    </span>
                    <input
                      placeholder="e.g. Bride · Mumbai"
                      className={field}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="block text-[11px] tracking-wider text-muted-foreground uppercase">
                      Your Review (Optional)
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Describe the look, styling, and your experience..."
                      className={field}
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                    />
                  </label>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full border border-border px-5 py-2.5 text-xs text-muted-foreground hover:border-accent hover:text-accent cursor-pointer bg-transparent"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full accent-gradient px-6 py-2.5 text-xs font-semibold text-accent-foreground hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.06 * i}>
                <p className="font-display text-4xl text-accent">{s.value}</p>
                <p className="mt-1 text-[11px] tracking-wider text-muted-foreground uppercase">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews-grid-section" className="px-4 py-16 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((r, i) => {
              const isLocal = localReviews.some((lr) => lr.name === r.name && lr.quote === r.quote);
              const isDeletable = isLocal || (isAdmin && Boolean(r.id));
              return (
                <Reveal key={`${r.name}-${i}`} delay={0.05 * (i % 6)}>
                  <TiltCard className="group h-full" intensity={8}>
                    <article className="glass-panel h-full rounded-3xl p-7 flex flex-col justify-between min-h-[220px]">
                      <div>
                        <div className="flex justify-between items-start">
                          <Quote className="h-6 w-6 text-accent/70" />
                          {isDeletable && (
                            <button
                              type="button"
                              onClick={() => handleDeleteReview(r)}
                              className="text-muted-foreground/40 hover:text-destructive cursor-pointer transition-colors p-1"
                              title="Delete this review"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                          “{r.quote}”
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <div>
                          <p className="font-display text-lg">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.role}</p>
                        </div>
                        <span className="flex gap-0.5 text-accent">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`h-3 w-3 ${j < (r.rating ?? 5) ? "fill-current" : "text-muted-foreground/30"}`}
                            />
                          ))}
                        </span>
                      </div>
                    </article>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          {showReadMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-accent hover:text-accent cursor-pointer bg-card/25"
              >
                Read more
              </button>
            </div>
          )}

          {totalPages > 1 && isExpanded && (
            <div className="mt-14 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card/25 text-muted-foreground transition-all hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePageChange(idx)}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-xs font-semibold transition-all duration-200 ${
                    currentPage === idx
                      ? "accent-gradient border-transparent text-accent-foreground shadow-md scale-105"
                      : "border-border bg-card/25 text-muted-foreground hover:border-accent hover:text-foreground"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card/25 text-muted-foreground transition-all hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-24">
        <Reveal className="mx-auto max-w-6xl">
          <div className="glass-panel flex flex-wrap items-center justify-between gap-6 rounded-[2rem] p-8 md:p-12">
            <h2 className="font-display text-3xl">Ready to be the next one?</h2>
            <Link
              to="/inquiry"
              className="rounded-full accent-gradient px-7 py-3.5 font-semibold text-accent-foreground"
            >
              Check my date
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
