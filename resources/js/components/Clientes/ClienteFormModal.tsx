
import { useForm } from "@inertiajs/react";
import { X, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClienteFormModalProps {
    onClose: () => void;
}

export function ClienteFormModal({ onClose }: ClienteFormModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        id:"",
        nombre: "",
        apellido1: "",
        apellido2: "",
        ciudad: "",
        categoria: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post("/clientes", {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Encabezado */}
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Nuevo cliente
                        </h2>

                        <p className="text-sm text-slate-500">
                            Ingresa los datos del cliente.
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

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4 p-5">

                    <div>
                        <Label htmlFor="id" required>
                            ID del cliente
                        </Label>

                        <Input
                            id="id"
                            name="id"
                            type="number"
                            min="1"
                            value={data.id}
                            onChange={(e) => setData("id",e.target.value)}
                            placeholder="Ingresa el ID del cliente"
                            error={errors.id}
                        />
                    </div>

                    <div>
                        <Label htmlFor="nombre" required>
                            Nombre
                        </Label>

                        <Input
                            id="nombre"
                            name="nombre"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            placeholder="Nombre del cliente"
                            error={errors.nombre}
                        />
                    </div>

                    <div>
                        <Label htmlFor="apellido1" required>
                            Primer apellido
                        </Label>

                        <Input
                            id="apellido1"
                            name="apellido1"
                            value={data.apellido1}
                            onChange={(e) => setData("apellido1", e.target.value)}
                            placeholder="Primer apellido"
                            error={errors.apellido1}
                        />
                    </div>

                    <div>
                        <Label htmlFor="apellido2">
                            Segundo apellido
                        </Label>

                        <Input
                            id="apellido2"
                            name="apellido2"
                            value={data.apellido2}
                            onChange={(e) => setData("apellido2", e.target.value)}
                            placeholder="Segundo apellido"
                            error={errors.apellido2}
                        />
                    </div>

                    <div>
                        <Label htmlFor="ciudad" required>
                            Ciudad
                        </Label>

                        <Input
                            id="ciudad"
                            name="ciudad"
                            value={data.ciudad}
                            onChange={(e) => setData("ciudad", e.target.value)}
                            placeholder="Ciudad del cliente"
                            error={errors.ciudad}
                        />
                    </div>

                    <div>
                        <Label htmlFor="categoria">
                            Categoría
                        </Label>

                        <Input
                            id="categoria"
                            name="categoria"
                            type="number"
                            min="1"
                            value={data.categoria}
                            onChange={(e) => setData("categoria", e.target.value)}
                            placeholder="Número de categoría"
                            error={errors.categoria}
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            <Save size={17} />
                            {processing ? "Guardando..." : "Guardar cliente"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
