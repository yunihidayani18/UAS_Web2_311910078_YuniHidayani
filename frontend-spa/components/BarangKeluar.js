const BarangKeluar = {

template: `
<div class="container mx-auto mt-10">

    <h1 class="text-2xl font-bold mb-4">
        Barang Keluar
    </h1>

    <div class="mb-4">

        <select
            v-model="barang_id"
            class="border p-2 mr-2 w-56"
        >
            <option disabled value="">
                Pilih Barang
            </option>

            <option
                v-for="b in barang"
                :key="b.id"
                :value="b.id"
            >
                {{ b.nama_barang }}
            </option>
        </select>

        <input
            type="date"
            v-model="tanggal"
            class="border p-2 mr-2"
        >

        <input
            v-model="jumlah"
            placeholder="Jumlah"
            class="border p-2 mr-2"
        >

        <button
            @click="simpanBarangKeluar"
            class="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Tambah
        </button>

    </div>

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
`,

data() {
    return {
        barangKeluar: [],
        barang: [],
        barang_id: '',
        tanggal: '',
        jumlah: ''
    }
},

async mounted() {
    this.loadBarang()
    this.loadBarangKeluar()
},

methods: {

    async loadBarang() {

        const token = localStorage.getItem('token')

        const response = await axios.get(
            'http://localhost:8080/barang',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.barang = response.data
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

    console.log(response.data)

    this.barangKeluar = response.data
},

    async simpanBarangKeluar() {

    if (!this.barang_id || !this.tanggal || !this.jumlah) {
    alert('Semua data harus diisi')
    return
    }

    const token = localStorage.getItem('token')

    try {

        await axios.post(
            'http://localhost:8080/barang-keluar',
            {
                barang_id: this.barang_id,
                tanggal: this.tanggal,
                jumlah: this.jumlah
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.barang_id = ''
        this.tanggal = ''
        this.jumlah = ''

        this.loadBarangKeluar()

        alert('Barang keluar berhasil ditambahkan')

    } catch (error) {

        alert(
            error.response.data.messages.message ??
            error.response.data.message
        )
    }
}



}

}