"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import {
  loginSchema,
  type LoginFormValues,
  type LoginPayload,
  type LoginResponse,
} from "../../types/auth";

/**
 * Calls the auth API. Kept inside this client component (rather than being
 * passed in as an `onSubmit` prop from a Server Component page) because
 * Next.js App Router cannot serialize a plain function across the
 * server/client boundary — passing one in causes:
 * "Event handlers cannot be passed to Client Component props."
 */
async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? "Invalid email or password");
  }

  return res.json();
}

export function LoginForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onBlur",
  });

  const submitHandler = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const { token } = await loginRequest({
        email: values.email,
        password: values.password,
      });
      // Persist the token however your app's auth strategy expects, e.g.:
      // dispatch(setCredentials({ token }));
      console.log("Logged in, token received:", token);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  });

  return (
    <form
      onSubmit={submitHandler}
      noValidate
      className="flex w-full max-w-sm flex-col gap-6"
      aria-label="Log in to your Avenrich account"
    >
      <h1 className="text-4xl font-bold text-[#2D5A27]">Log In</h1>

      <Input
        label="Email"
        icon={<Mail size={18} strokeWidth={1.75} />}
        type="email"
        autoComplete="email"
        placeholder="avenrich123@gamil.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        icon={<Lock size={18} strokeWidth={1.75} />}
        type="password"
        autoComplete="current-password"
        placeholder="********"
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between">
        <Checkbox label="Remember" {...register("remember")} />
        <a
          href="/forgot-password"
          className="text-sm text-gray-500 hover:text-[#2D5A27] hover:underline"
        >
          Forgotten?
        </a>
      </div>

      {submitError && (
        <p role="alert" className="text-sm font-medium text-red-500">
          {submitError}
        </p>
      )}

      <Button type="submit" isLoading={isSubmitting}>
        Log In
      </Button>
    </form>
  );
}