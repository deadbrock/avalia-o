import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  gradient?: boolean;
  className?: string;
}

export default function Card({
  children,
  hover = false,
  gradient = false,
  className = "",
}: CardProps) {
  const baseClasses = "bg-white rounded-3xl p-8 shadow-xl border border-gray-100";
  const hoverClasses = hover
    ? "hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    : "";
  const gradientClasses = gradient ? "relative overflow-hidden group" : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}>
      {children}
      {gradient && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      )}
    </div>
  );
}

