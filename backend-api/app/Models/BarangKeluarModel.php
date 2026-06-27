<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangKeluarModel extends Model
{
    protected $table = 'barang_keluar';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'barang_id',
        'tanggal',
        'jumlah'
    ];

    protected $returnType = 'array';
}