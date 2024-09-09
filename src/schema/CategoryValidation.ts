// categories/schema.ts
import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(6),
});
