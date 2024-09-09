// categories/schema.ts
import { z } from "zod";

//Creating a category
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

const getCategoryByIdSchema = z.object({
  id: z.number(),
});

//Updating a category (optional fields)
export const updateCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

// for id
export const categoryIdSchema = z.object({
  id: z.number(),
});
