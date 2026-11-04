
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/searchinput";
import {
    DataTable,
    type TableColumn,
} from "@/components/tables/data-table";

import { PedidoFormModal } from "@/components/Pedidos/PedidoFormModal";
import { PedidoEditModal } from "@/components/Pedidos/PedidoEditModal";

// Tipos de datos
interface Cliente {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string | null;
}

interface Comercial {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
}

interface Pedido {
    id: number;
    cantidad: number | string;
    fecha: string;
    id_cliente: number;
    id_comercial: number;
    cliente: Cliente | null;
    comercial: Comercial | null;
}

// Propiedades recibidas desde Laravel
interface Props {
    pedidos: Pedido[];
    clientes: Cliente[];
    comerciales: Comercial[];
}

// Columnas de la tabla
const columns: TableColumn<Pedido>[] = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "cantidad",
        label: "Importe",
        render: (pedido) =>
            `$${Number(pedido.cantidad).toFixed(2)}`,
    },
    {
        key: "fecha",
        label: "Fecha",
        render: (pedido) => pedido.fecha.slice(0, 10),
    },
    {
        key: "cliente",
        label: "Cliente",
        render: (pedido) =>
            pedido.cliente
                ? `${pedido.cliente.nombre} ${pedido.cliente.apellido1} ${pedido.cliente.apellido2 ?? ""}`
                : "Sin cliente",
    },
    {
        key: "comercial",
        label: "Comercial",
        render: (pedido) =>
            pedido.comercial
                ? `${pedido.comercial.nombre} ${pedido.comercial.apellido1} ${pedido.comercial.apellido2}`
                : "Sin comercial",
    },
];

export default function Index({
    pedidos,
    clientes,
    comerciales,
}: Props) {
    // Estados
    const [busqueda, setBusqueda] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [pedidoEditar, setPedidoEditar] = useState<Pedido | null>(null);

    // Filtrar pedidos
    const pedidosFiltrados = pedidos.filter((pedido) => {
        const texto = busqueda.toLowerCase();

        const nombreCliente = pedido.cliente
            ? `${pedido.cliente.nombre} ${pedido.cliente.apellido1} ${pedido.cliente.apellido2 ?? ""}`
            : "";

        const nombreComercial = pedido.comercial
            ? `${pedido.comercial.nombre} ${pedido.comercial.apellido1} ${pedido.comercial.apellido2}`
            : "";

        return (
            String(pedido.id).includes(texto) ||
            String(pedido.cantidad).includes(texto) ||
            pedido.fecha.includes(texto) ||
            nombreCliente.toLowerCase().includes(texto) ||
            nombreComercial.toLowerCase().includes(texto)
        );
    });

    // Eliminar pedido
    const eliminarPedido = (pedido: Pedido) => {
        const confirmar = window.confirm(
            `¿Estás seguro de eliminar el pedido ${pedido.id}?`
        );

        if (confirmar) {
            router.delete(`/pedidos/${pedido.id}`);
        }
    };

    return (
        <>
            <Head title="Pedidos" />

            <div className="space-y-6 p-6">

                {/* Encabezado */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Pedidos
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Administración de pedidos registrados.
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        onClick={() => setMostrarFormulario(true)}
                    >
                        <Plus size={18} />
                        Nuevo pedido
                    </Button>
                </div>

                {/* Buscador y total */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="w-full sm:max-w-sm">
                        <SearchInput
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Buscar pedido..."
                            onClear={() => setBusqueda("")}
                        />
                    </div>

                    <p className="text-sm text-slate-500">
                        Total de pedidos: {pedidosFiltrados.length}
                    </p>
                </div>

                {/* Tabla */}
                <DataTable
                    columns={columns}
                    data={pedidosFiltrados}
                    emptyMessage="No se encontraron pedidos."
                    onEdit={(pedido) => setPedidoEditar(pedido)}
                    onDelete={eliminarPedido}
                />
            </div>

            {/* Modal de registro */}
            {mostrarFormulario && (
                <PedidoFormModal
                    clientes={clientes}
                    comerciales={comerciales}
                    onClose={() => setMostrarFormulario(false)}
                />
            )}

            {/* Modal de edición */}
            {pedidoEditar && (
                <PedidoEditModal
                    pedido={pedidoEditar}
                    clientes={clientes}
                    comerciales={comerciales}
                    onClose={() => setPedidoEditar(null)}
                />
            )}
        </>
    );
}
