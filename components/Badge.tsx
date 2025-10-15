import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "gradient" | "primary" | "secondary" | "success" | "info";
  className?: string;
}

export default function Badge({
  children,
  variant = "gradient",
  className = "",
}: BadgeProps) {
  const variants = {
    gradient: "px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-white text-xs font-bold",
    primary: "px-3 py-1.5 bg-red-100 text-primary rounded-lg text-sm font-medium",
    secondary: "px-3 py-1.5 bg-blue-100 text-secondary rounded-lg text-sm font-medium",
    success: "px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium",
    info: "px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium",
  };

  return (
    <span className={`inline-flex items-center ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

