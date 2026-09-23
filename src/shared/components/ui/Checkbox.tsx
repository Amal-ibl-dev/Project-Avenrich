import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * Small square checkbox paired with an inline label, used for "Remember".
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label
        htmlFor={inputId}
        className="flex select-none items-center gap-2 text-sm text-gray-600"
      >
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-[#2D5A27]",
            "focus:ring-2 focus:ring-[#2D5A27]/30 focus:ring-offset-0",
            "accent-[#2D5A27]",
            className
          )}
          {...props}
        />
        {label}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
