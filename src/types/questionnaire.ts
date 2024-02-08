import { z } from "zod";
import { metaResponseUI } from "@/types/api.types";
import { addRespondentSchema } from "@/validations/questionnaire";

export type RespondentPostUI = z.infer<typeof addRespondentSchema>;

// User
export interface QuestionnaireUI extends RespondentPostUI {
  id: string;
  questionnaire_url: string;
  questionnaire_title: string;
  status: string;
  created_at: string;
  created_by: string;
  created_by_name: string;
  updated_at: string;
  respondent_qty: number;
  questionnaire_filled: number;
  questionnaire_total_price: number;
}

export interface QuestionnaireResponseUI {
  // meta: metaResponseUI;
  message: string;
  data: QuestionnaireUI[];
}

// export type QuestionnairePutUI = z.TypeOf<typeof updateQuestionnaireSchema>;

// export type UserBodyRequest<T extends string | undefined> = T extends string
// 	? QuestionnairePutUI
// : QuestionnairePostUI;
