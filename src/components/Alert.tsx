import React from "react";

interface AlertProps {
  variant?: "SUCCESS" | "ERROR";
  title?: string;
  children: React.ReactNode;
}

function Alert({ variant = "SUCCESS", title, children }: AlertProps) {
  return (
    <div className={alertVariants[variant]} >
      {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
      <div className="text-sm">{children}</div>
    </div>
  );
}


const alertVariants = {
  SUCCESS: 'bg-green-50 border-green-200 text-green-800',
  ERROR: 'bg-red-50 border-red-200 text-red-800',
} as const;

export default Alert;
