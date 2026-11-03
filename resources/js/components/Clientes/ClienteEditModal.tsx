
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
    ciudad: string;
    categoria: number | null;
}

interface Props {
    cliente: Cliente;
    onClose: () => void;
}

export function ClienteEditModal({ cliente, onClose }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: cliente.nombre,
        apellido1: cliente.apellido1,
        apellido2: cliente.apellido2 ?? "",
        ciudad: cliente.ciudad,
        categoria: cliente.categoria?.toString() ?? "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(`/clientes/${cliente.id}`, {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                <div className="flex items-center justify-between border-b p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Editar cliente
                        </h2>
                        <p className="text-sm text-slate-500">
                            Modifica la información del cliente.
                        </p>
                    </div>

                    <button type="button" onClick={onClose} aria-label="Cerrar">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-5">

                    <div>
                        <Label>ID del cliente</Label>
                        <Input value={cliente.id} disabled />
                    </div>

                    <div>
                        <Label htmlFor="nombre" required>Nombre</Label>
                        <Input
                            id="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            error={errors.nombre}
                        />
                    </div>

                    <div>
                        <Label htmlFor="apellido1" required>Primer apellido</Label>
                        <Input
                            id="apellido1"
                            value={data.apellido1}
                            onChange={(e) => setData("apellido1", e.target.value)}
                            error={errors.apellido1}
                        />
                    </div>

                    <div>
                        <Label htmlFor="apellido2">Segundo apellido</Label>
                        <Input
                            id="apellido2"
                            value={data.apellido2}
                            onChange={(e) => setData("apellido2", e.target.value)}
                            error={errors.apellido2}
                        />
                    </div>

                    <div>
                        <Label htmlFor="ciudad" required>Ciudad</Label>
                        <Input
                            id="ciudad"
                            value={data.ciudad}
                            onChange={(e) => setData("ciudad", e.target.value)}
                            error={errors.ciudad}
                        />
                    </div>

                    <div>
                        <Label htmlFor="categoria">Categoría</Label>
                        <Input
                            id="categoria"
                            type="number"
                            min="1"
                            value={data.categoria}
                            onChange={(e) => setData("categoria", e.target.value)}
                            error={errors.categoria}
                        />
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit" disabled={processing}>
                            <Save size={17} />
                            {processing ? "Actualizando..." : "Guardar cambios"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
