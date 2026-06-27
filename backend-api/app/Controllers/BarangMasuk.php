<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BarangModel;

class BarangMasuk extends ResourceController
{
    protected $modelName = 'App\Models\BarangMasukModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond(
            $this->model
                ->select('barang_masuk.*, barang.nama_barang')
                ->join('barang', 'barang.id = barang_masuk.barang_id')
                ->findAll()
        );
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        $this->model->insert($data);

        $barangModel = new BarangModel();

        $barang = $barangModel->find($data['barang_id']);

        $barangModel->update(
            $data['barang_id'],
            [
                'stok' => $barang['stok'] + $data['jumlah']
            ]
        );

        return $this->respondCreated([
            'message' => 'Barang masuk berhasil ditambahkan'
        ]);
    }
}