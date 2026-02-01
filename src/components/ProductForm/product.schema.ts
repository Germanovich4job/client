import z from "zod";

export const productSchema = z.object({
  title: z.string().min(1, { message: "Название обязательно" }),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  category: z.string().optional(),
  manufacturer: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export type ProductFormSchema = z.infer<typeof productSchema>;
