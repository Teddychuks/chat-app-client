import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(4, {
    message: "Passord length must contain atleast 4 characters",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  username: z.string().min(4, {
    message: "Username must contain atleast 4 characters",
  }),
  password: z.string().min(4, {
    message: "Passord length must contain atleast 4 characters",
  }),
  profilepicture: z.string().optional(),
});
