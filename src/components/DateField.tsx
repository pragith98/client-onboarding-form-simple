import React, { useId } from "react";
import { FieldError } from "react-hook-form";

interface DateFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: FieldError | string;
  required?: boolean;
}

function DateField({
  id,
  label,
  error,
  required = false,
  ...props
}: DateFieldProps) {
  // Generate unique ID if not provided
  const generatedId = useId();
  const inputId = id || `datefield-${generatedId}`;
  const errorId = `${generatedId}-error`;

  // Extract error message
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div>
      {/* Label */}
      <label htmlFor={inputId} className={labelStyles}>
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Date field */}
      <input
        type="date"
        id={inputId}
        className={`
          ${dateFieldStyles}
          ${error ? errorStyles : ""}
        `}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : ""}
        {...props}
      />

      {/* Error Message */}
      {errorMessage && (
        <div id={errorId} className={errorStyles} role="alert">
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

// Date field styles
const dateFieldStyles = `
  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
  transition-colors
`;

const errorStyles = `
  text-sm 
  text-red-600 
  border-red-300 
  focus:border-red-500 
  focus:ring-red-500
`;

const labelStyles = `
  block text-sm font-medium transition-colors text-gray-700
`;

export default DateField;
