
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";

interface SearchInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    onClear?: () => void;
}

export function SearchInput({
    value,
    onChange,
    onClear,
    placeholder = "Buscar...",
    className = "",
    ...props
}: SearchInputProps) {
    const hasValue = String(value ?? "").length > 0;

    return (
        <div className={`relative w-full ${className}`}>
            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
                {...props}
                type="search"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="pl-10 pr-10"
            />

            {hasValue && onClear && (
                <button
                    type="button"
                    onClick={onClear}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                    <X size={17} />
                </button>
            )}
        </div>
    );
}
