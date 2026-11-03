import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-500",
};

const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
};

export function Button({
    variant = "primary",
    size = "md",
    type = "button",
    className = "",
    disabled = false,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={[
                "inline-flex items-center justify-center gap-2 rounded-md font-medium",
                "transition-colors focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className,
            ].join(" ")}
            {...props}
        >
            {children}
        </button>
    );
}