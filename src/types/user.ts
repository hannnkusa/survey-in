import { z } from "zod";
import { metaResponseUI } from "@/types/api.types";
import { updateUserSchema, addUserSchema } from "@/validations/user";
import { UserRecord } from "firebase-admin/auth";

// User
export interface UserUI extends UserRecord {
  id: string;
  role: string;
  phone_number: string;
}

export interface UserResponseUI {
  meta: metaResponseUI;
  data: UserUI[];
}

export type UserPutUI = z.TypeOf<typeof updateUserSchema>;
export type UserPostUI = z.TypeOf<typeof addUserSchema>;

// export type UserBodyRequest<T extends string | undefined> = T extends string
// 	? UserCustomerPutUI
// 	: UserCustomerPostUI;
