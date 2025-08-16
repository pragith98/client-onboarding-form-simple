import React, { useId } from "react";
import { FieldError } from "react-hook-form";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: FieldError | string;
}

function Checkbox({ id, label, description, error, ...props }: CheckboxProps) {
  // Generate unique ID if not provided
  const generatedId = useId();
  const checkboxId = id || `textfield-${generatedId}`;
  const errorId = `${checkboxId}-error`;

  // Extract error message
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className="space-y-1">
      <div className="flex items-start">
        <input type="checkbox" {...props} className={checkboxStyles} />
        {label && (
          <div className="ml-3">
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {label}
            </label>
            {description && (
              <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
        )}
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

// Checkbox styles
const checkboxStyles = `
  h-4 
  w-4 
  text-blue-600 
  focus:ring-blue-500 
  border-gray-300 
  rounded mt-0.5
`;

const errorStyles = "text-sm text-red-600 flex items-center gap-1";

export default Checkbox;
