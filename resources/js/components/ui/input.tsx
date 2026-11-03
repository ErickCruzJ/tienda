import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export function Input({
    error,
    className = "",
    id,
    name,
    ...props
}: InputProps) {
    const inputId = id ?? name;

    return (
        <div className="w-full">
            <input
                id={inputId}
                name={name}
                aria-invalid={Boolean(error)}
                aria-describedby={
                    error && inputId ? `${inputId}-error` : undefined
                }
                className={[
                    "block w-full rounded-md border bg-white px-3 py-2 text-sm text-slate-900",
                    "placeholder:text-slate-400",
                    "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
                    "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-slate-300",
                    className,
                ].join(" ")}
                {...props}
            />

            {error && (
                <p
                    id={inputId ? `${inputId}-error` : undefined}
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
}