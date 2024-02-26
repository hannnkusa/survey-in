import { metaResponseUI } from "@/types/api.types";

// Notification
export interface NotificationUI {
  id: string;
  title: string;
  description: string;
  url: string;
  target: string;
  created_at: string;
  deleted_at: string;
  readed: boolean;
}

export interface NotificationResponseUI {
  // meta: metaResponseUI;
  message: string;
  data: NotificationUI[];
}
