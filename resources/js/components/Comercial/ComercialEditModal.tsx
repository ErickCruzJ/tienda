
import { useForm } from "@inertiajs/react";
import { X, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Comercial {
    id: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    ciudad: string | null;
    comision: number | string;
}

interface Props {
    comercial: Comercial;
    onClose: () => void;
}

export function ComercialEditModal({ comercial, onClose }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: comercial.nombre,
        apellido1: comercial.apellido1,
        apellido2: comercial.apellido2,
        ciudad: comercial.ciudad ?? "",
        comision: comercial.comision.toString(),
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(`/comerciales/${comercial.id}`, {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Encabezado */}
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Editar comercial
                        </h2>

                        <p className="text-sm text-slate-500">
                            Modifica la información del comercial.
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
                        <Label htmlFor="id">
                            ID del comercial
                        </Label>

                        <Input
                            id="id"
                            value={comercial.id}
                            disabled
                        />
                    </div>

                    <div>
                        <Label htmlFor="nombre" required>
                            Nombre
                        </Label>

                        <Input
                            id="nombre"
                            required
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            error={errors.nombre}
                        />
                    </div>

                    <div>
                        <Label htmlFor="apellido1" required>
                            Primer apellido
                        </Label>

                        <Input
                            id="apellido1"
                            required
                            value={data.apellido1}
                            onChange={(e) => setData("apellido1", e.target.value)}
                            error={errors.apellido1}
                        />
                    </div>

                    <div>
                        <Label htmlFor="apellido2" required>
                            Segundo apellido
                        </Label>

                        <Input
                            id="apellido2"
                            required
                            value={data.apellido2}
                            onChange={(e) => setData("apellido2", e.target.value)}
                            error={errors.apellido2}
                        />
                    </div>

                    <div>
                        <Label htmlFor="ciudad">
                            Ciudad
                        </Label>

                        <Input
                            id="ciudad"
                            value={data.ciudad}
                            onChange={(e) => setData("ciudad", e.target.value)}
                            error={errors.ciudad}
                        />
                    </div>

                    <div>
                        <Label htmlFor="comision" required>
                            Comisión
                        </Label>

                        <Input
                            id="comision"
                            type="number"
                            min="0"
                            step="any"
                            required
                            value={data.comision}
                            onChange={(e) => setData("comision", e.target.value)}
                            error={errors.comision}
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
