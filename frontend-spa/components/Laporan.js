const Laporan = {

template: `
<div class="container mx-auto mt-10">

    <h1 class="text-2xl font-bold mb-6">
        Laporan Inventory
    </h1>

    <button
    @click="cetakLaporan"
    class="bg-green-500 text-white px-4 py-2 rounded mb-6"
    >
    Cetak Laporan
    </button>

    <h2 class="text-xl font-bold mb-2">
        Barang Masuk
    </h2>

    <table class="table-auto border w-full mb-8">
        <thead>
            <tr>
                <th class="border p-2">ID</th>
                <th class="border p-2">Barang</th>
                <th class="border p-2">Tanggal</th>
                <th class="border p-2">Jumlah</th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="item in barangMasuk"
                :key="item.id"
            >
                <td class="border p-2">{{ item.id }}</td>
                <td class="border p-2">{{ item.nama_barang }}</td>
                <td class="border p-2">{{ item.tanggal }}</td>
                <td class="border p-2">{{ item.jumlah }}</td>
            </tr>
        </tbody>
    </table>

    <h2 class="text-xl font-bold mb-2">
        Barang Keluar
    </h2>

    <table class="table-auto border w-full">
        <thead>
            <tr>
                <th class="border p-2">ID</th>
                <th class="border p-2">Barang</th>
                <th class="border p-2">Tanggal</th>
                <th class="border p-2">Jumlah</th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="item in barangKeluar"
                :key="item.id"
            >
                <td class="border p-2">{{ item.id }}</td>
                <td class="border p-2">{{ item.nama_barang }}</td>
                <td class="border p-2">{{ item.tanggal }}</td>
                <td class="border p-2">{{ item.jumlah }}</td>
            </tr>
        </tbody>
    </table>

</div>

<style>
@media print {
    nav,
    button {
        display: none;
    }
}
</style>
`,

data() {
    return {
        barangMasuk: [],
        barangKeluar: []
    }
},

async mounted() {
    this.loadBarangMasuk()
    this.loadBarangKeluar()
},

methods: {

    async loadBarangMasuk() {

        const token = localStorage.getItem('token')

        const response = await axios.get(
            'http://localhost:8080/barang-masuk',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.barangMasuk = response.data
    },

    async loadBarangKeluar() {

        const token = localStorage.getItem('token')

        const response = await axios.get(
            'http://localhost:8080/barang-keluar',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.barangKeluar = response.data
    },

    cetakLaporan() {
    window.print()
}

}

}