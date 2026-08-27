import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote, ChevronLeft, ChevronRight, Trash2, Filter, RotateCcw } from "lucide-react";
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
      {
        title:
          "Client Reviews — Heer Dagha | Top Rated Hair Artist & Makeup Stylist in Mumbai",
      },
      {
        name: "description",
        content:
          "Read 5-star reviews from brides, grooms & clients styled by Heer Dagha across Andheri, Bandra, Churchgate, Mumbai & destination weddings. Rated 4.9/5 for long-lasting hairstyles & flawless makeup.",
      },
      {
        name: "keywords",
        content:
          "Heer Dagha reviews, Heer daga, her dagha, her daga, heer daha, heee dagha, heee daga, Best hair artist in mumbai, Best hair artist in Bandra, Best hair artist in Andheri, Best hair artist in churchgate, Best hair artist in India, Makeup artists reviews Mumbai, client feedback Heer Dagha",
      },
      {
        property: "og:title",
        content: "Client Reviews — Heer Dagha | Top Rated Hair Artist in Mumbai",
      },
      {
        property: "og:description",
        content:
          "1500+ happy faces and counting. Read real reviews from Heer Dagha's clients across Mumbai and destination events.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://heerdagha.com/reviews" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  const [localReviews, setLocalReviews] = useState<
    Array<{ name: string; role: string; quote: string; rating?: number }>
  >([]);

  const [dbReviews, setDbReviews] = useState<
    Array<{ id?: string; name: string; role: string; quote: string; rating?: number }>
  >([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true") {
        setIsAdmin(true);
      }

      const saved = localStorage.getItem("heer_reviews");
      if (saved) {
        try {
          setLocalReviews(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
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
    setSelectedStarFilter(null);
    setIsOpen(false);
  };

  const handleDeleteReview = async (review: {
    id?: string | undefined;
    name: string;
    role: string;
    quote: string;
    rating?: number | undefined;
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
    ? [
        ...dbReviews.map((r) => ({
          id: r.id,
          name: r.name,
          role: r.role,
          quote: r.quote,
          rating: r.rating ?? 5,
        })),
        ...reviews.map((r) => ({
          id: undefined,
          name: r.name,
          role: r.role,
          quote: r.quote,
          rating: r.rating ?? 5,
        })),
      ]
    : [
        ...localReviews.map((r) => ({
          id: undefined,
          name: r.name,
          role: r.role,
          quote: r.quote,
          rating: r.rating ?? 5,
        })),
        ...reviews.map((r) => ({
          id: undefined,
          name: r.name,
          role: r.role,
          quote: r.quote,
          rating: r.rating ?? 5,
        })),
      ];

  const totalCount = mergedReviews.length;
  const averageRating =
    totalCount > 0
      ? (mergedReviews.reduce((sum, r) => sum + (r.rating ?? 5), 0) / totalCount).toFixed(1)
      : "5.0";

  const starCounts: Record<number, number> = {
    5: mergedReviews.filter((r) => (r.rating ?? 5) === 5).length,
    4: mergedReviews.filter((r) => (r.rating ?? 5) === 4).length,
    3: mergedReviews.filter((r) => (r.rating ?? 5) === 3).length,
    2: mergedReviews.filter((r) => (r.rating ?? 5) === 2).length,
    1: mergedReviews.filter((r) => (r.rating ?? 5) === 1).length,
  };

  const filteredReviews =
    selectedStarFilter !== null
      ? mergedReviews.filter((r) => (r.rating ?? 5) === selectedStarFilter)
      : mergedReviews;

  const [currentPage, setCurrentPage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const reviewsPerPage = 15;
  const initialVisibleReviews = 6;

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentPageReviews = filteredReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage,
  );
  const visibleReviews =
    isExpanded || currentPage > 0
      ? currentPageReviews
      : currentPageReviews.slice(0, initialVisibleReviews);

  const showReadMore =
    !isExpanded && currentPage === 0 && currentPageReviews.length > initialVisibleReviews;

  const handlePageChange = (pageIdx: number) => {
    setCurrentPage(pageIdx);
    setIsExpanded(true);
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
        <div className="reviews-parent mx-auto max-w-6xl">
          <Reveal className="reviews-header flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Review</p>
              <h1 className="reviews-title mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.95]">
                1500+ faces, <span className="text-gradient italic">one standard</span>
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

          <div className="reviews-stats-grid mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.06 * i}>
                <p className="font-display text-4xl text-accent">{s.value}</p>
                <p className="mt-1 text-[11px] tracking-wider text-muted-foreground uppercase">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Google Maps Style Rating Overview & Breakdown */}
          <Reveal delay={0.15}>
            <div className="glass-panel mt-6 sm:mt-12 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-border bg-card/40 backdrop-blur-md relative">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 lg:items-center lg:justify-between">
                {/* Overall Score Box */}
                <div className="flex flex-row lg:flex-col items-start lg:items-start justify-between lg:justify-start min-w-0 lg:min-w-[210px] border-b lg:border-b-0 lg:border-r border-border pb-3 sm:pb-6 lg:pb-0 lg:pr-8">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-gradient leading-none">
                      {averageRating}
                    </span>
                    <span className="text-sm sm:text-xl text-muted-foreground font-display">/ 5.0</span>
                  </div>

                  <div className="flex flex-col items-end lg:items-start">
                    {/* Stars display */}
                    <div className="flex items-center gap-0.5 sm:gap-1 my-0.5 sm:my-3 text-accent">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const score = parseFloat(averageRating);
                        const isFull = idx + 1 <= Math.floor(score);
                        const isHalf = !isFull && idx < Math.ceil(score) && score % 1 >= 0.25;
                        return (
                          <div key={idx} className="relative">
                            <Star
                              className={`h-4 w-4 sm:h-6 sm:w-6 ${isFull ? "fill-current" : "text-muted-foreground/30"}`}
                            />
                            {isHalf && (
                              <div className="absolute inset-0 overflow-hidden w-1/2">
                                <Star className="h-4 w-4 sm:h-6 sm:w-6 fill-current text-accent" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                      Based on {totalCount} reviews
                    </p>

                    {selectedStarFilter !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStarFilter(null);
                          setCurrentPage(0);
                        }}
                        className="mt-1 sm:mt-3 inline-flex items-center gap-1 text-[10px] sm:text-xs text-accent hover:underline cursor-pointer font-semibold"
                      >
                        <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Show all ({totalCount})
                      </button>
                    )}
                  </div>

                  {/* Mobile-only Filter Button on Top Right Corner */}
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="sm:hidden flex items-center gap-1.5 accent-gradient px-3 py-1.5 rounded-full text-xs font-semibold text-accent-foreground shadow-md cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    <span>{selectedStarFilter ? `${selectedStarFilter}★` : "Filter"}</span>
                  </button>
                </div>

                {/* Rating Distribution Bars */}
                <div className="flex-1 space-y-1 sm:space-y-2.5 max-w-xl">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = starCounts[star] || 0;
                    const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
                    const isSelected = selectedStarFilter === star;

                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          setSelectedStarFilter(isSelected ? null : star);
                          setCurrentPage(0);
                          setIsExpanded(false);
                        }}
                        className={`w-full flex items-center gap-2 sm:gap-3 px-2 py-1 sm:p-2 rounded-lg sm:rounded-xl transition-all cursor-pointer text-left group ${
                          isSelected
                            ? "bg-accent/15 ring-1 ring-accent"
                            : "hover:bg-card/60"
                        }`}
                        title={`Filter by ${star} star reviews`}
                      >
                        <div className="flex items-center gap-1 w-10 sm:w-16 shrink-0 text-[11px] sm:text-xs font-semibold text-foreground">
                          <span>{star}</span>
                          <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-accent fill-current" />
                        </div>

                        <div className="flex-1 h-2 sm:h-3 rounded-full bg-muted/60 overflow-hidden relative">
                          <div
                            className="h-full accent-gradient rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        <div className="w-14 sm:w-20 text-right shrink-0 text-[10px] sm:text-xs text-muted-foreground font-medium group-hover:text-foreground">
                          {count} <span className="text-[9px] sm:text-[10px] opacity-75">({percentage}%)</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Pills / Tabs — Hidden on mobile (sm:hidden), visible on desktop (hidden sm:flex) */}
              <div className="hidden sm:flex mt-8 pt-6 border-t border-border flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground mr-1 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5 text-accent" /> Filter:
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedStarFilter(null);
                    setCurrentPage(0);
                    setIsExpanded(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedStarFilter === null
                      ? "accent-gradient text-accent-foreground shadow-sm font-semibold scale-105"
                      : "bg-card/40 border border-border text-muted-foreground hover:border-accent hover:text-foreground"
                  }`}
                >
                  All ({totalCount})
                </button>

                {[5, 4, 3, 2, 1].map((star) => {
                  const count = starCounts[star] || 0;
                  const isSelected = selectedStarFilter === star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setSelectedStarFilter(isSelected ? null : star);
                        setCurrentPage(0);
                        setIsExpanded(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                        isSelected
                          ? "accent-gradient text-accent-foreground shadow-sm font-semibold scale-105"
                          : "bg-card/40 border border-border text-muted-foreground hover:border-accent hover:text-foreground"
                      }`}
                    >
                      <span>{star} Star</span>
                      <Star
                        className={`h-3 w-3 ${isSelected ? "fill-current text-accent-foreground" : "text-accent fill-current"}`}
                      />
                      <span className="text-[11px] opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Mobile Filter Popup Dialog */}
          <Dialog open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <DialogContent className="glass-panel text-foreground border-border max-w-xs p-6 rounded-3xl">
              <DialogHeader>
                <DialogTitle className="font-display text-xl text-gradient flex items-center gap-2">
                  <Filter className="h-4 w-4 text-accent" /> Filter Reviews
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-xs mt-1">
                  Choose a star rating to filter client reviews:
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStarFilter(null);
                    setCurrentPage(0);
                    setIsExpanded(false);
                    setIsMobileFilterOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                    selectedStarFilter === null
                      ? "accent-gradient border-transparent text-accent-foreground shadow-md"
                      : "border-border bg-card/40 text-foreground hover:border-accent"
                  }`}
                >
                  <span>All Reviews</span>
                  <span className="text-xs opacity-80">({totalCount})</span>
                </button>

                {[5, 4, 3, 2, 1].map((star) => {
                  const count = starCounts[star] || 0;
                  const isSelected = selectedStarFilter === star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setSelectedStarFilter(star);
                        setCurrentPage(0);
                        setIsExpanded(false);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "accent-gradient border-transparent text-accent-foreground shadow-md"
                          : "border-border bg-card/40 text-foreground hover:border-accent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{star} Stars</span>
                        <div className="flex text-accent gap-0.5">
                          {Array.from({ length: star }).map((_, j) => (
                            <Star
                              key={j}
                              className={`h-3 w-3 ${isSelected ? "fill-current text-accent-foreground" : "fill-current text-accent"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section id="reviews-grid-section" className="px-4 py-12 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          {selectedStarFilter !== null && (
            <div className="mb-6 flex items-center justify-between bg-card/30 border border-border p-4 rounded-2xl">
              <p className="text-xs font-medium text-muted-foreground">
                Showing <span className="text-foreground font-semibold">{filteredReviews.length}</span> {selectedStarFilter}-star review{filteredReviews.length !== 1 ? "s" : ""}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedStarFilter(null);
                  setCurrentPage(0);
                }}
                className="text-xs text-accent font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Clear filter
              </button>
            </div>
          )}

          {visibleReviews.length === 0 ? (
            <Reveal>
              <div className="glass-panel text-center py-16 px-6 rounded-3xl border border-border">
                <p className="text-xl font-display text-muted-foreground">
                  No {selectedStarFilter ? `${selectedStarFilter}-star` : ""} client reviews found
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">
                  {selectedStarFilter
                    ? `There are currently no ${selectedStarFilter}-star reviews in our database.`
                    : "Be the first to share your experience by clicking \"Add a review\" above."}
                </p>
                {selectedStarFilter !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStarFilter(null);
                      setCurrentPage(0);
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full accent-gradient px-6 py-2.5 text-xs font-semibold text-accent-foreground hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                    View All Reviews ({totalCount})
                  </button>
                )}
              </div>
            </Reveal>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {visibleReviews.map((r, i) => {
                const isLocal = localReviews.some((lr) => lr.name === r.name && lr.quote === r.quote);
                const isDeletable = isLocal || (isAdmin && Boolean(r.id));
                return (
                  <Reveal key={`${r.name}-${i}`} delay={0.05 * (i % 6)}>
                    <TiltCard className="group h-full" intensity={8}>
                      <article className="reviews-grid-card glass-panel h-full rounded-3xl p-7 flex flex-col justify-between min-h-[220px]">
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
                          <div className="flex flex-col items-end gap-1">
                            <span className="flex gap-0.5 text-accent">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star
                                  key={j}
                                  className={`h-3 w-3 ${j < (r.rating ?? 5) ? "fill-current" : "text-muted-foreground/30"}`}
                                />
                              ))}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-semibold">
                              {(r.rating ?? 5).toFixed(1)} ★
                            </span>
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          )}

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

          {totalPages > 1 && (
            <div className="mt-14 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 0}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card/25 text-muted-foreground transition-all hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
                  title="Previous page"
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
                  title="Next page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {currentPage > 0 && (
                <button
                  type="button"
                  onClick={() => handlePageChange(0)}
                  className="text-xs text-accent font-semibold hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Back to page 1
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-24">
        <Reveal className="mx-auto max-w-6xl">
          <div className="reviews-cta glass-panel flex flex-wrap items-center justify-between gap-6 rounded-[2rem] p-8 md:p-12">
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
