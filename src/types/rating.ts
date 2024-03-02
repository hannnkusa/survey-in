import { metaResponseUI } from "@/types/api.types";

// Rating Index
export interface RatingUI {
  id: string;
  created_at: string;
  created_by: string;
  created_by_email: string;
  created_by_name: string;
  feedback: string;
  rating: number;
}

export interface RatingResponseUI {
  // meta: metaResponseUI;
  message: string;
  data: RatingUI[];
}

// Rating Summary Detail
export interface RatingSummaryDetailUI {
  rating_value: number;
  rating_picked: number;
}

// Rating Summary
export interface RatingSummaryUI {
  rating_summary: RatingSummaryDetailUI[];
  rating_average: number;
  rating_picked_total: number;
  rating_value_total: number;
}

export interface RatingSummaryResponseUI {
  // meta: metaResponseUI;
  message: string;
  data: RatingSummaryUI;
}
