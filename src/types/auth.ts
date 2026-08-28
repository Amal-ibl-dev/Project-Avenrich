import { z } from "zod";

/**
 * Zod schema used for both runtime validation and static type inference.
 * Keeping a single source of truth avoids the login form's TS type and
 * its validation rules drifting apart.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  remember: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/** Payload actually sent to the auth API (remember flag handled client-side). */
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
}

export type AuthStatus = "idle" | "submitting" | "success" | "error";
