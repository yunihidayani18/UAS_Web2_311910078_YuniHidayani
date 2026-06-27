<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\BarangModel;

class BarangKeluar extends ResourceController
{
    protected $modelName = 'App\Models\BarangKeluarModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond(
            $this->model
                ->select('barang_keluar.*, barang.nama_barang')
                ->join('barang', 'barang.id = barang_keluar.barang_id')
                ->findAll()
        );
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        $barangModel = new BarangModel();

        $barang = $barangModel->find($data['barang_id']);

        // Cek stok cukup atau tidak
        if ($barang['stok'] < $data['jumlah']) {
            return $this->fail([
                'message' => 'Stok tidak mencukupi'
            ]);
        }

        // Simpan barang keluar
        $this->model->insert($data);

        // Kurangi stok
        $barangModel->update(
            $data['barang_id'],
            [
                'stok' => $barang['stok'] - $data['jumlah']
            ]
        );

        return $this->respondCreated([
            'message' => 'Barang keluar berhasil ditambahkan'
        ]);
    }
}