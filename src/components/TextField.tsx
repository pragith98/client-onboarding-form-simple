import React, { InputHTMLAttributes, useId } from "react";
import { FieldError } from "react-hook-form";

export enum TextFieldVariant {
  FILLED = "filled",
  OUTLINED = "outlined",
}

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: FieldError | string;
  required?: boolean;
  variant?: TextFieldVariant;
  disabled?: boolean;
}

function TextField({
  id,
  label,
  error,
  required = false,
  variant = TextFieldVariant.OUTLINED,
  disabled,
  ...props
}: TextFieldProps) {
  // Generate unique ID if not provided
  const generatedId = useId();
  const inputId = id || `textfield-${generatedId}`;
  const errorId = `${inputId}-error`;

  // Extract error message
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className="space-y-1">
      {/* Label */}
      <label htmlFor={inputId} className={labelStyles}>
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Input Container */}
      <div>
        <input
          id={inputId}
          className={`${inputBaseStyles} ${variantStyles[variant]}`}
          disabled={disabled}
          required={required}
          aria-invalid={!!errorMessage}
          aria-describedby={`
            ${errorMessage ? errorId : ""}
          `}
          {...props}
        />
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div id={errorId} className={errorStyles} role="alert">
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

// TextField styles
const inputBaseStyles = `
  w-full transition-all duration-200 ease-in-out px-3 py-2 text-sm
  placeholder:text-gray-400
  disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
  focus:outline-none focus:ring-2 focus:ring-offset-0 
`;

const variantStyles = {
  filled: `
    border-0 border-b-2 border-gray-300 rounded-t-md bg-gray-50
    hover:bg-gray-100 hover:border-gray-400
    focus:bg-white focus:border-blue-500 focus:ring-blue-500
  `,
  outlined: `
    border-2 border-gray-300 rounded-lg bg-transparent
    hover:border-gray-400
    focus:border-blue-500 focus:ring-blue-500
  `,
} as const;

const labelStyles = `
  block text-sm font-medium transition-colors text-gray-700
`;

const errorStyles = "text-sm text-red-600 flex items-center gap-1";

export default TextField;
