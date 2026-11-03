
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { ClienteFormModal } from "@/components/Clientes/ClienteFormModal";
import { ClienteEditModal } from "@/components/Clientes/ClienteEditModal";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/searchinput";
import {
    DataTable,
    type TableColumn,
} from "@/components/tables/data-table";

interface Cliente {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string | null;
    ciudad: string;
    categoria: number | null;
}

interface Props {
    clientes: Cliente[];
}

const columns: TableColumn<Cliente>[] = [
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
        render: (cliente) => cliente.apellido2 ?? "—",
    },
    {
        key: "ciudad",
        label: "Ciudad",
    },
    {
        key: "categoria",
        label: "Categoría",
        render: (cliente) => cliente.categoria ?? "Sin categoría",
    },
];

export default function Index({ clientes }: Props) {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [clienteEditar, setClienteEditar] = useState<Cliente | null>(null);

    const [busqueda, setBusqueda] = useState("");

    const clientesFiltrados = clientes.filter((cliente) => {
        const texto = busqueda.toLowerCase();

        const nombreCompleto = [
            cliente.nombre,
            cliente.apellido1,
            cliente.apellido2 ?? "",
        ].join(" ");

        return (
            nombreCompleto.toLowerCase().includes(texto) ||
            cliente.ciudad.toLowerCase().includes(texto) ||
            String(cliente.id).includes(texto)
        );
    });

    return (
        <>
            <Head title="Clientes" />

            <div className="space-y-6 p-6">
                {/* Encabezado */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Clientes
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Administración de clientes registrados.
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        onClick={() => setMostrarFormulario(true)}
                    >
                        <Plus size={18}/>
                        Nuevo cliente
                    </Button>
                </div>

                {/* Búsqueda y total */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="w-full sm:max-w-sm">
                        <SearchInput
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar cliente..."
                            onClear={() => setBusqueda("")}
                        />
                    </div>

                    <p className="text-sm text-slate-500">
                        Total de clientes: {clientesFiltrados.length}
                    </p>
                </div>

                {/* Tabla */}
                <DataTable
                    columns={columns}
                    data={clientesFiltrados}
                    emptyMessage="No se encontraron clientes."

                    onEdit={(cliente) =>{
                        setClienteEditar(cliente);
                    }}

                    onDelete={(cliente) => {
                        const confirmar = window.confirm(
                            `¿Estás seguro del eliminar al ciente ${cliente.nombre} ${cliente.apellido1}?`
                        );
                        if(confirmar){
                            router.delete(`/clientes/${cliente.id}`);
                        }
                    }}
                />
            </div>
            {mostrarFormulario &&(
                <ClienteFormModal
                    onClose={() => setMostrarFormulario(false)}
                />
            )}
            {clienteEditar && (
                <ClienteEditModal
                    cliente={clienteEditar}
                    onClose={()=> setClienteEditar(null)}
                />
            )}
        </>
    );
}
