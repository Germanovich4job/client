import z from "zod"

export const registerSchema = z.object({
  username: z.string().min(2, "Минимальная длина имени - 2 символа").max(50),
  firstName: z.string().min(2, "Минимальная длина имени - 2 символа").max(50),
  lastName: z.string().min(2, "Минимальная длина имени - 2 символа").max(50),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(6, "Пароль должен содержать минимум 8 символов"),
  repeatPassword: z
    .string()
    .min(6, "Пароль должен содержать минимум 8 символов"),
})

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
