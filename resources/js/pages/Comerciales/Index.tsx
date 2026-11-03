
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/searchinput";
import {
    DataTable,
    type TableColumn,
} from "@/components/tables/data-table";

import { ComercialFormModal } from "@/components/Comercial/ComercialFormModal";
import { ComercialEditModal } from "@/components/Comercial/ComercialEditModal";

interface Comercial {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    ciudad: string | null;
    comision: number | string;
}

interface Props {
    comerciales: Comercial[];
}

const columns: TableColumn<Comercial>[] = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "nombre",
        label: "Nombre",
    },
    {
        key: "apellido1",
        label: "Primer apellido",
    },
    {
        key: "apellido2",
        label: "Segundo apellido",
    },
    {
        key: "ciudad",
        label: "Ciudad",
        render: (comercial) => comercial.ciudad ?? "—",
    },
    {
        key: "comision",
        label: "Comisión",
        render: (comercial) =>
            Number(comercial.comision).toFixed(2),
    },
];

export default function Index({ comerciales }: Props) {
    const [busqueda, setBusqueda] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [comercialEditar, setComercialEditar] =
        useState<Comercial | null>(null);

    // Filtrar comerciales
    const comercialesFiltrados = comerciales.filter((comercial) => {
        const texto = busqueda.toLowerCase();

        const nombreCompleto = [
            comercial.nombre,
            comercial.apellido1,
            comercial.apellido2,
        ].join(" ");

        return (
            nombreCompleto.toLowerCase().includes(texto) ||
            (comercial.ciudad ?? "").toLowerCase().includes(texto) ||
            String(comercial.id).includes(texto)
        );
    });

    // Eliminar comercial
    const eliminarComercial = (comercial: Comercial) => {
        const confirmar = window.confirm(
            `¿Estás seguro de eliminar al comercial ${comercial.nombre} ${comercial.apellido1}?`
        );

        if (confirmar) {
            router.delete(`/comerciales/${comercial.id}`);
        }
    };

    return (
        <>
            <Head title="Comerciales" />

            <div className="space-y-6 p-6">

                {/* Encabezado */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Comerciales
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Administración de comerciales registrados.
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        onClick={() => setMostrarFormulario(true)}
                    >
                        <Plus size={18} />
                        Nuevo comercial
                    </Button>
                </div>

                {/* Búsqueda y total */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="w-full sm:max-w-sm">
                        <SearchInput
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar comercial..."
                            onClear={() => setBusqueda("")}
                        />
                    </div>

                    <p className="text-sm text-slate-500">
                        Total de comerciales: {comercialesFiltrados.length}
                    </p>
                </div>

                {/* Tabla */}
                <DataTable
                    columns={columns}
                    data={comercialesFiltrados}
                    emptyMessage="No se encontraron comerciales."

                    onEdit={(comercial) => {
                        setComercialEditar(comercial);
                    }}

                    onDelete={eliminarComercial}
                />
            </div>

            {/* Modal de registro */}
            {mostrarFormulario && (
                <ComercialFormModal
                    onClose={() => setMostrarFormulario(false)}
                />
            )}

            {/* Modal de edición */}
            {comercialEditar && (
                <ComercialEditModal
                    comercial={comercialEditar}
                    onClose={() => setComercialEditar(null)}
                />
            )}
        </>
    );
}
