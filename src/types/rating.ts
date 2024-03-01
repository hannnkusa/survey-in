import { metaResponseUI } from "@/types/api.types";

// Notification
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
