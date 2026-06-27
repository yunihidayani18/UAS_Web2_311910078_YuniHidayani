<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

$routes->get('/', 'Home::index');

$routes->post('login', 'Auth::login');

$routes->options('(:any)', static function () {
    return service('response');
});

// TANPA FILTER DULU
$routes->resource('barang');

$routes->resource('kategori');

$routes->resource(
    'supplier',
    ['filter' => 'auth']
 );

$routes->get('barang-masuk', 'BarangMasuk::index');
$routes->post('barang-masuk', 'BarangMasuk::create');
$routes->get('barang-keluar', 'BarangKeluar::index');
$routes->post('barang-keluar', 'BarangKeluar::create');