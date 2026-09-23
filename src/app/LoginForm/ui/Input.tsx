import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the input, next to the icon. */
  label: string;
  /** Leading icon (e.g. a lucide-react <Mail /> or <Lock /> element). */
  icon?: ReactNode;
  /** Validation error message. When present, the input gets an error style
   *  and `aria-invalid`/`aria-describedby` are wired up automatically. */
  error?: string;
}

/**
 * Branded text input matching the Avenrich login design: a label row with
 * a leading icon, and a pill-ish outlined field below it.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          {icon && (
            <span className="text-gray-500" aria-hidden="true">
              {icon}
            </span>
          )}
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn(
            "w-full rounded-xl border border-gray-200 bg-white px-4 py-3",
            "text-sm text-gray-700 placeholder:text-gray-400",
            "outline-none transition-colors duration-150",
            "focus:border-[#2D5A27] focus:ring-2 focus:ring-[#2D5A27]/20",
            error && "border-red-400 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-xs font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
