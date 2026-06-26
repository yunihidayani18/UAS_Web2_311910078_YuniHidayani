const BarangMasuk = {

template: `
<div class="container mx-auto mt-10">

    <h1 class="text-2xl font-bold mb-4">
        Barang Masuk
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
        :value="String(b.id)"
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
            @click="simpanBarangMasuk"
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
                v-for="item in barangMasuk"
                :key="item.id"
            >
                <td class="border p-2">
                    {{ item.id }}
                </td>

                <td class="border p-2">
                    {{ item.nama_barang }}
                </td>

                <td class="border p-2">
                    {{ item.tanggal }}
                </td>

                <td class="border p-2">
                    {{ item.jumlah }}
                </td>
            </tr>

        </tbody>

    </table>

</div>
`,

data() {
    return {
        barangMasuk: [],
        barang: [],
        barang_id: '',
        tanggal: '',
        jumlah: ''
    }
},
async mounted() {
     console.log('mounted jalan')
    this.loadBarang()
    this.loadBarangMasuk()
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
console.log('loadBarang jalan')
console.log(response.data)
        this.barang = response.data
    },

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

    async simpanBarangMasuk() {
    
    if (!this.barang_id || !this.tanggal || !this.jumlah) {
    alert('Semua data harus diisi')
    return
    }

    const token = localStorage.getItem('token')
     console.log({
        barang_id: this.barang_id,
        tanggal: this.tanggal,
        jumlah: this.jumlah
    })

    await axios.post(
        'http://localhost:8080/barang-masuk',
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

    this.loadBarangMasuk()
}

}

}