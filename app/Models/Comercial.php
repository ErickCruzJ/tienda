<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comercial extends Model
{
    protected $table = 'comercial';

    protected $primaryKey = 'id';

    public $incrementing = false;

    public $timestamps = false;

    protected $fillable = [
        'id',
        'nombre',
        'apellido1',
        'apellido2',
        'ciudad',
        'comision',
    ];

    public function pedidos(): HasMany
    {
        return $this->hasMany(Pedido::class, 'id_comercial');
    }
}
