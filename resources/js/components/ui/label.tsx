import type { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    children: ReactNode;
}

export function Label({
    required = false,
    className = "",
    children,
    ...props
}: LabelProps) {
    return (
        <label
            className={[
                "mb-1.5 block text-sm font-medium text-slate-700",
                className,
            ].join(" ")}
            {...props}
        >
            {children}

            {required && (
                <span className="ml-1 text-red-600" aria-hidden="true">
                    *
                </span>
            )}
        </label>
    );
}