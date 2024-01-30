import { z } from 'zod';

// Add User Customer
export const addRespondentSchema = z.object({
	name: z
		.string()
		.regex(/^[a-zA-Z0-9\s_-]*$/, 'Name must contain only letters')
		.min(1, { message: 'Name is required' }),
	email: z.string().email('Email is not valid'),
	user_role: z.string(),
});

export const updateQuestionnaireSchema = z.object({
	name: z
		.string()
		.regex(/^[a-zA-Z0-9\s_-]*$/, 'Name must contain only letters')
		.min(1, { message: 'Name is required' }),
	new_email: z.string().email('Email is not valid'),
	user_role: z.array(z.string()),
});
