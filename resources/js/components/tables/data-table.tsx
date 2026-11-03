import type { ReactNode } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TableColumn<T> {
    key: keyof T;
    label: string;
    render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    onView?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    onView,
    onEdit,
    onDelete,
    emptyMessage = "No hay registros disponibles.",
}: DataTableProps<T>) {

    const hasActions = Boolean(onView || onEdit || onDelete);

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">

                {/* Encabezados */}
                <thead className="bg-slate-50 text-slate-600">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className="px-4 py-3 font-semibold"
                            >
                                {column.label}
                            </th>
                        ))}

                        {hasActions && (
                            <th className="px-4 py-3 text-center font-semibold">
                                Acciones
                            </th>
                        )}
                    </tr>
                </thead>

                {/* Contenido */}
                <tbody className="divide-y divide-slate-100">

                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50">

                                {columns.map((column) => (
                                    <td
                                        key={String(column.key)}
                                        className="px-4 py-3 text-slate-700"
                                    >
                                        {column.render
                                            ? column.render(item)
                                            : String(item[column.key] ?? "—")}
                                    </td>
                                ))}

                                {/* Acciones */}
                                {hasActions && (
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center gap-2">

                                            {onView && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onView(item)}
                                                    title="Ver"
                                                    aria-label="Ver registro"
                                                >
                                                    <Eye size={17} />
                                                </Button>
                                            )}

                                            {onEdit && (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    title="Editar"
                                                    aria-label="Editar registro"
                                                >
                                                    <Pencil size={17} />
                                                </Button>
                                            )}

                                            {onDelete && (
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => onDelete(item)}
                                                    title="Eliminar"
                                                    aria-label="Eliminar registro"
                                                >
                                                    <Trash2 size={17} />
                                                </Button>
                                            )}

                                        </div>
                                    </td>
                                )}

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + (hasActions ? 1 : 0)}
                                className="px-4 py-8 text-center text-slate-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
}