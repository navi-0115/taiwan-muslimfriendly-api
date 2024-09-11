// sites/schema.ts
import { z } from "zod";

//Creating a sites
export const createSiteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(6),
  categoryId: z.number().int().min(1),
  contactId: z.number().int().min(1),
});

//Updating a sites (optional fields)
export const updateSiteSchema = z.object({
  name: z.string(),
  description: z.string().min(6),
  categoryId: z.number().int().min(1),
  contactId: z.number().int().min(1),
});

// For sites id schema
export const siteIdSchema = z.object({
  id: z.coerce.number().int().min(1),
});
