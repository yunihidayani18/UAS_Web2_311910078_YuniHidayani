const routes = [

{
path:'/',
component:Home
},

{
path:'/login',
component:Login
},

{
path:'/dashboard',
component:Dashboard
},

{
    path:'/barang',
    component:Barang
},

{
    path:'/kategori',
    component:Kategori
},

{
    path:'/supplier',
    component:Supplier
},

{
    path:'/barang-masuk',
    component:BarangMasuk
},

{
    path:'/barang-keluar',
    component:BarangKeluar
},

{
    path:'/laporan',
    component:Laporan
}

]

const router = VueRouter.createRouter({

history: VueRouter.createWebHashHistory(),

routes

})
window.router = router