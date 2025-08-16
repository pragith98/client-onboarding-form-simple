import React from "react";
import { FieldError } from "react-hook-form";

interface CheckboxGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxGroupOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: FieldError | string;
  required?: boolean;
}

function CheckboxGroup({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
}: CheckboxGroupProps) {
  // Extract error message
  const errorMessage = typeof error === "string" ? error : error?.message;

  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className="space-y-3">
      <fieldset>
        {/* Label */}
        <legend className={labelStyles}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>

        {/* Checkboxes */}
        <div className="mt-2 space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className={`${optionLabelStyles} ${
                option.disabled ? optionLabelDisabledStyles : ""
              }`}
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                disabled={option.disabled}
                className={checkboxStyles}
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-gray-700">
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <div className={errorStyles} role="alert">
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

// Checkbox group styles
const labelStyles = `
  block text-sm font-medium transition-colors text-gray-700
`;

const optionLabelStyles = `
  flex 
  items-start 
  p-3 
  border 
  border-gray-200 
  rounded-lg 
  hover:bg-gray-50 
  cursor-pointer 
  transition-colors
`;

const checkboxStyles = `
  h-4 
  w-4 
  text-blue-600 
  focus:ring-blue-500 
  border-gray-300 
  rounded mt-0.5
`;

const optionLabelDisabledStyles = "opacity-50 cursor-not-allowed";

const errorStyles = "text-sm text-red-600 flex items-center gap-1";

export default CheckboxGroup;
