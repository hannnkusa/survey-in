import { z } from 'zod';
import { metaResponseUI } from '@/types/api.types';
import { addQuestionnaireSchema, updateQuestionnaireSchema } from '@/validations/questionnaire';

// User
export interface QuestionnaireUI {
	id: string;
	url: string;
	questionnaire_title: string;
	status: string;
	created_at: string;
	created_by: string;
	updated_at: string;
	respondent_qty_target: number;
	questionnaire_filled: number;
}

export interface QuestionnaireResponseUI {
	// meta: metaResponseUI;
	message: string;
	data: QuestionnaireUI[];
}

export type QuestionnairePostUI = z.infer<typeof addQuestionnaireSchema>;

export type QuestionnairePutUI = z.TypeOf<typeof updateQuestionnaireSchema>;

export type UserBodyRequest<T extends string | undefined> = T extends string
	? QuestionnairePutUI
	: QuestionnairePostUI;
