import { z } from "zod";

// Update User
export const addUserSchema = z.object({
  full_name: z.string(),
  phone_number: z.string(),
  email: z.string(),
  password: z.string(),
});

// Update User
export const updateUserSchema = z.object({
  full_name: z.string(),
  phone_number: z.string(),
});
