import { z } from "zod";

const siteSchema = z.object({
  name: z.string().min(6),
  description: z.string().min(6),
  categoryId: z.number().int().min(1),
  contactId: z.number().int().min(1),
});
