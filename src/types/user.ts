import { z } from "zod";
import { metaResponseUI } from "@/types/api.types";
import { updateUserSchema, addUserSchema } from "@/validations/user";
import { UserRecord } from "firebase-admin/auth";

// User
export interface UserUI extends UserRecord {
  created_at: string;
  phone_number: string;
  role: string;
  updated_at: string | null;
}

export interface UserResponseUI {
  meta: metaResponseUI;
  data: UserUI[];
}

export interface UserResponseDetailUI {
  meta: metaResponseUI;
  data: UserUI;
}

export type UserPutUI = z.TypeOf<typeof updateUserSchema>;
export type UserPostUI = z.TypeOf<typeof addUserSchema>;

// export type UserBodyRequest<T extends string | undefined> = T extends string
// 	? UserCustomerPutUI
// 	: UserCustomerPostUI;
