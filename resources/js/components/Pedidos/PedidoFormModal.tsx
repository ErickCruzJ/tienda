
import { useForm } from "@inertiajs/react";
import { X, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface Props {
    clientes: Cliente[];
    comerciales: Comercial[];
    onClose: () => void;
}

export function PedidoFormModal({
    clientes,
    comerciales,
    onClose,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: "",
        cantidad: "",
        fecha: "",
        id_cliente: "",
        id_comercial: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post("/pedidos", {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Nuevo pedido
                        </h2>
                        <p className="text-sm text-slate-500">
                            Ingresa los datos del pedido.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
                        aria-label="Cerrar formulario"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-5">

                    <div>
                        <Label htmlFor="id" required>
                            ID del pedido
                        </Label>
                        <Input
                            id="id"
                            type="number"
                            min="1"
                            required
                            value={data.id}
                            onChange={(e) => setData("id", e.target.value)}
                            placeholder="Ingresa el ID del pedido"
                            error={errors.id}
                        />
                    </div>

                    <div>
                        <Label htmlFor="cantidad" required>
                            Importe del pedido
                        </Label>
                        <Input
                            id="cantidad"
                            type="number"
                            min="0"
                            step="0.01"
                            required
                            value={data.cantidad}
                            onChange={(e) => setData("cantidad", e.target.value)}
                            placeholder="0.00"
                            error={errors.cantidad}
                        />
                    </div>

                    <div>
                        <Label htmlFor="fecha" required>
                            Fecha del pedido
                        </Label>
                        <Input
                            id="fecha"
                            type="date"
                            required
                            value={data.fecha}
                            onChange={(e) => setData("fecha", e.target.value)}
                            error={errors.fecha}
                        />
                    </div>

                    <div>
                        <Label htmlFor="id_cliente" required>
                            Cliente
                        </Label>
                        <select
                            id="id_cliente"
                            required
                            value={data.id_cliente}
                            onChange={(e) => setData("id_cliente", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        >
                            <option value="">Selecciona un cliente</option>

                            {clientes.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nombre} {cliente.apellido1}{" "}
                                    {cliente.apellido2 ?? ""}
                                </option>
                            ))}
                        </select>

                        {errors.id_cliente && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.id_cliente}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="id_comercial" required>
                            Comercial
                        </Label>
                        <select
                            id="id_comercial"
                            required
                            value={data.id_comercial}
                            onChange={(e) => setData("id_comercial", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                        >
                            <option value="">Selecciona un comercial</option>

                            {comerciales.map((comercial) => (
                                <option key={comercial.id} value={comercial.id}>
                                    {comercial.nombre} {comercial.apellido1}{" "}
                                    {comercial.apellido2}
                                </option>
                            ))}
                        </select>

                        {errors.id_comercial && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.id_comercial}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit" disabled={processing}>
                            <Save size={17} />
                            {processing ? "Guardando..." : "Guardar pedido"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
