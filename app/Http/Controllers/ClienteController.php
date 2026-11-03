<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = Cliente::all();
        return Inertia::render('Clientes/Index',[
            'clientes' => $clientes,
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
        $datos = $request -> validate([
            'id' => 'required|integer|min:1|unique:cliente,id',
            'nombre' => 'required|string|max:100',
            'apellido1' => 'required|string|max:100',
            'apellido2' => 'nullable|string|max:100',
            'ciudad' => 'required|string|max:100',
            'categoria' => 'nullable|interger',
        ]);

        Cliente::create($datos);

        return redirect()
            ->route('clientes.index')
            ->with('success','Cliente registrado correctamente.');
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
        $cliente = Cliente::findOrFail($id);
        
        $datos = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido1' => 'required|string|max:100',
            'apellido2' => 'nullable|string|max:100',
            'ciudad' => 'required|string|max:10',
            'categoria' => 'nullable|integer',
        ]);

        $cliente->update($datos);

        return redirect()
            ->route('clientes.index')
            ->with('success', 'Cliente actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cliente = Cliente::findOrFail($id);

        $cliente->delete();

        return redirect()
            ->route('clientes.index')
            ->with('success','Cliente eliminado correctamente. ');
    }
}
