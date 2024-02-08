import { z } from 'zod';
import { metaResponseUI } from '@/types/api.types';
import { updateUserSchema } from '@/validations/user';

// User
export interface UserCustomerUI {
	id: string;
	account_name: string;
	email: string;
	user_roles: string[];
	status: string;
}

export interface UserCustomerResponseUI {
	meta: metaResponseUI;
	data: UserCustomerUI[];
}

export type UserPutUI = z.TypeOf<typeof updateUserSchema>;

// export type UserBodyRequest<T extends string | undefined> = T extends string
// 	? UserCustomerPutUI
// 	: UserCustomerPostUI;
