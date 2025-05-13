import { z } from "zod";

export const getUsersSchema = z
  .string()
  .transform(Number)
  .refine((val) => !isNaN(val) && val > 0, {
    message: "Page needs to be only positive number",
  });

export const deleteUserSchema = z.string().uuid();

export const createUserSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.string().email().max(255),
  password: z.string().min(1),
  orgId: z.string().uuid(),
});
