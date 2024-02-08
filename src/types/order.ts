import { z } from "zod";
import { metaResponseUI } from "@/types/api.types";
import { addOrderSchema } from "@/validations/order";

// User
export interface OrderUI {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  file_url: string;
  questionnaire_id: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  payment_proof_url: string;
}

export interface OrderResponseUI {
  // meta: metaResponseUI;
  message: string;
  data: OrderUI[];
}

export interface OrderDetailUI {
  // meta: metaResponseUI;
  message: string;
  data: OrderUI;
}

export type OrderPostUI = z.infer<typeof addOrderSchema>;

// export type QuestionnairePutUI = z.TypeOf<typeof updateQuestionnaireSchema>;

// export type UserBodyRequest<T extends string | undefined> = T extends string
// 	? QuestionnairePutUI
// : QuestionnairePostUI;
