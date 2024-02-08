import { z } from "zod";

// Add User Customer
export const addRespondentSchema = z.object({
  respondent_type: z.string(),
  respondent_qty: z.number(),
  segmented_type: z.string(),
  segmented_basic_detail: z.object({
    gender: z.array(z.string()),
    marital_status: z.array(z.string()),
    age: z.array(z.number()),
    religion: z.array(z.string()),
    location: z.array(z.string()),
  }).nullish(),
  segmented_advanced_detail: z.object({
    busyness: z.array(z.string()),
    education: z.array(z.string()),
    expenditure: z.array(z.number()),
    smoking: z.array(z.string()),
    alcoholic: z.array(z.string()),
    workout: z.array(z.string()),
    social_media: z.array(z.string()),
    ecommerce: z.array(z.string()),
    sport: z.array(z.string()),
    hobby: z.array(z.string()),
    genre: z.array(z.string()),
    music_genre: z.array(z.string()),
    food: z.array(z.string()),
    pet: z.array(z.string()),
  }).nullish(),
});
