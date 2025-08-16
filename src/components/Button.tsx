import React from "react";

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  OUTLINED = "outlined",
}

export enum ButtonType {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset"
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  type?: ButtonType;
  disabled?: boolean;
  isLoading?: boolean;
}

function Button({
  children,
  onClick,
  variant = ButtonVariant.PRIMARY,
  type = ButtonType.BUTTON,
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        ${baseStyle} 
        ${variantStyles[variant]} 
        ${disabled && disabledStyle} 
        ${isLoading && disabledStyle}
      `}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

// Button styles
const baseStyle = `
  flex 
  w-full 
  justify-center 
  rounded-md 
  px-3 
  py-1.5 
  font-semibold 
  shadow-xs 
  focus-visible:outline-2 
  focus-visible:outline-offset-2
`;

const variantStyles = {
  primary: `
    bg-indigo-600 
    text-white 
    hover:bg-indigo-500 
    focus-visible:outline-indigo-600
  `,
  secondary: `
    bg-gray-600 
    text-white 
    hover:bg-gray-700 
    focus:ring-gray-500
  `,
  danger: `
    bg-red-600 
    text-white 
    hover:bg-red-700 
    focus:ring-red-500
  `,
  outlined: `
    border 
    border-gray-300 
    text-gray-700 
    hover:bg-gray-100 
    focus:ring-gray-500
  `,
} as const;

const disabledStyle = "opacity-50 cursor-not-allowed";

export default Button;
