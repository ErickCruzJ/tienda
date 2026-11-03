<?php

namespace App\Http\Controllers;

use App\Models\Comercial;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ComercialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comerciales = Comercial::all();
        return Inertia::render('Comerciales/Index',[
            'comerciales' => $comerciales,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $datos = $request->validate([
            'id' => 'required|integer|min:1|unique:comercial,id',
            'nombre' => 'required|string|max:100',
            'apellido1' => 'required|string|max:100',
            'apellido2' => 'required|string|max:100',
            'ciudad' => 'nullable|string|max:100',
            'comision' => 'required|numeric|min:0',
        ]);

        Comercial::create($datos);

        return redirect()
            ->route('comerciales.index')
            ->with('success', 'Comercial registrado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comercial = Comercial::findOrFail($id);

        $datos = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido1' => 'required|string|max:100',
            'apellido2' => 'required|string|max:100',
            'ciudad' => 'nullable|string|max:100',
            'comision' => 'required|numeric|min:0',
        ]);

        $comercial->update($datos);

        return redirect()
            ->route('comerciales.index')
            ->with('success', 'Comercial actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comercial = Comercial::findOrFail($id);

        $comercial->delete();

        return redirect()
            ->route('comerciales.index')
            ->with('success', 'Comercial eliminado correctamente.');
    }
}
