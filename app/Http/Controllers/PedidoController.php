<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Cliente;
use App\Models\Comercial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pedidos = Pedido::with(['cliente', 'comercial'])->get();

        $clientes = Cliente::all();

        $comerciales = Comercial::all();

        return Inertia::render('Pedidos/Index', [
            'pedidos' => $pedidos,
            'clientes' => $clientes,
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
            'id' => 'required|integer|min:1|unique:pedido,id',
            'cantidad' => 'required|numeric|min:0',
            'fecha' => 'required|date',
            'id_cliente' => 'required|integer|exists:cliente,id',
            'id_comercial' => 'required|integer|exists:comercial,id',
        ]);

        Pedido::create($datos);

        return redirect()
            ->route('pedidos.index')
            ->with('success', 'Pedido registrado correctamente.');
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
        $pedido = Pedido::findOrFail($id);

        $datos = $request->validate([
            'cantidad' => 'required|numeric|min:0',
            'fecha' => 'required|date',
            'id_cliente' => 'required|integer|exists:cliente,id',
            'id_comercial' => 'required|integer|exists:comercial,id',
        ]);

        $pedido->update($datos);

        return redirect()
            ->route('pedidos.index')
            ->with('success', 'Pedido actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pedido = Pedido::findOrFail($id);

        $pedido->delete();

        return redirect()
            ->route('pedidos.index')
            ->with('success', 'Pedido eliminado correctamente.');
    }
}
