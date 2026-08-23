import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://your-supabase-project.supabase.co" &&
    !supabaseUrl.includes("your-supabase") &&
    supabaseAnonKey !== "your-supabase-anon-key-here"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ReviewRow {
  id?: string | undefined;
  created_at?: string | undefined;
  name: string;
  role: string;
  quote: string;
  rating?: number | undefined;
  avatar_url?: string | undefined;
  event_date?: string | undefined;
  location?: string | undefined;
  is_approved?: boolean | undefined;
}

export interface InquiryRow {
  id?: string | undefined;
  created_at?: string | undefined;
  name: string;
  event_date: string;
  city: string;
  services: string[];
  notes?: string | undefined;
  submit_type?: "whatsapp" | "email" | undefined;
  status?: string | undefined;
}

export async function fetchReviews(): Promise<ReviewRow[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetchReviews error:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn("Failed to fetch reviews from Supabase:", err);
    return [];
  }
}

export async function submitReview(review: Omit<ReviewRow, "id" | "created_at">): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from("reviews").insert([review]);
    if (error) {
      console.error("Supabase submitReview error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to submit review to Supabase:", err);
    return false;
  }
}

export async function submitInquiry(inquiry: Omit<InquiryRow, "id" | "created_at">): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from("inquiries").insert([inquiry]);
    if (error) {
      console.error("Supabase submitInquiry error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to submit inquiry to Supabase:", err);
    return false;
  }
}
