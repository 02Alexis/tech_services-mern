import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre es requerido"),

  email: z
    .string()
    .email("Email inválido"),

  password: z
    .string()
    .min(6, "Mínimo 6 caracteres")
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});