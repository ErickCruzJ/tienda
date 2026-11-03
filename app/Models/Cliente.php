<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cliente extends Model
{
    protected $table = 'cliente';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'nombre',
        'apellido1',
        'apellido2',
        'ciudad',
        'categoria',
    ];
    public function pedidos(): HasMany
    {
        return $this->hasMany(Pedido::class, 'id_cliente');
    }
}
