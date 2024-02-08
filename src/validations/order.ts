import { z } from "zod";

// Add User Customer
export const addOrderSchema = z.object({
  full_name: z.string().min(1, { message: "Payer's Name is required" }),
  email: z.string().email("Email is not valid"),
  phone_number: z.string().min(1, { message: "Phone Number is required" }),
  file: z.any(),
});
