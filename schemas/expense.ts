import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number(),
  category: z.string().uuid(),
  name: z.string(),
});
