import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = "rounded-xl px-6 py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";

  const variantClasses = {
    primary: "text-white bg-gradient-to-r from-primary to-red-700 hover:from-red-700 hover:to-primary shadow-lg hover:shadow-xl hover:scale-105",
    secondary: "text-white bg-gradient-to-r from-secondary to-blue-700 hover:from-blue-700 hover:to-secondary shadow-lg hover:shadow-xl hover:scale-105",
    outline: "text-primary border-2 border-primary hover:bg-primary hover:text-white",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
}

