// contact/schema.ts
import { z } from "zod";

//Creating a contacts
export const createContactSchema = z.object({
  name: z.string().min(6, "Name is required"),
  address: z.string().min(12, "address required"),
  phone: z.string().min(10, "phone required"),
});

//Updating a sites (optional fields)
export const updateContactSchema = z.object({
  name: z.string().min(6),
  address: z.string().min(12),
  phone: z.string().min(10),
});

// For contacts id schema
export const contactIdSchema = z.object({
  id: z.coerce.number().int().min(1),
});
