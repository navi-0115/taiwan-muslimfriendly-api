// categories/schema.ts
import { z } from "zod";

//Creating a category
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

//Updating a category (optional fields)
export const updateCategorySchema = z.object({
  name: z.string().optional(),
});

// for category id schema
export const categoryIdSchema = z.object({
  id: z.coerce.number().int().min(1),
});
