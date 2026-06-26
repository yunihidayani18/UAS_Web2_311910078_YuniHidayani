const Barang = {

template: `
<div class="container mx-auto mt-10">

    <h1 class="text-2xl font-bold mb-4">
        Data Barang
    </h1>
<div class="mb-4">

    <input
        v-model="nama_barang"
        placeholder="Nama Barang"
        class="border p-2 mr-2"
    >

    <select
        v-model="kategori_id"
        class="border p-2 mr-2"
    >
        <option value="">
            Pilih Kategori
        </option>

        <option
            v-for="k in kategori"
            :value="k.id"
        >
            {{ k.nama_kategori }}
        </option>
    </select>

    <input
        v-model="stok"
        placeholder="Stok"
        class="border p-2 mr-2"
    >

    <input
        v-model="harga"
        placeholder="Harga"
        class="border p-2 mr-2"
    >

    <button
        @click="simpanBarang"
        class="bg-blue-500 text-white px-4 py-2 rounded"
    >
        {{ editMode ? 'Update' : 'Tambah' }}
    </button>

</div>
    <table class="table-auto border w-full">

        <thead>
            <tr>
                <th class="border p-2">ID</th>
                <th class="border p-2">Nama Barang</th>
                <th class="border p-2">Kategori</th>
                <th class="border p-2">Stok</th>
                <th class="border p-2">Harga</th>
                <th class="border p-2">Aksi</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in barang" :key="item.id">
                <td class="border p-2">{{ item.id }}</td>
                <td class="border p-2">{{ item.nama_barang }}</td>
                <td class="border p-2">{{ item.nama_kategori }}</td>
                <td class="border p-2">{{ item.stok }}</td>
                <td class="border p-2">{{ item.harga }}</td>
                <td class="border p-2">

    <button
        @click="editBarang(item)"
        class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
    >
        Edit
    </button>

    <button
        @click="hapusBarang(item.id)"
        class="bg-red-500 text-white px-2 py-1 rounded"
    >
        Hapus
    </button>

</td>
            </tr>
        </tbody>

    </table>

</div>
`,

data() {
    return {
        barang: [],
        kategori: [],

        nama_barang: '',
        kategori_id: '',
        stok: '',
        harga: '',

        editMode: false,
        editId: null
    }
},
async mounted() {
    this.loadBarang()
    this.loadKategori()
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

    async loadKategori() {

        const token = localStorage.getItem('token')

        const response = await axios.get(
            'http://localhost:8080/kategori',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.kategori = response.data
    },

    async simpanBarang() {

        const token = localStorage.getItem('token')

        const data = {
            nama_barang: this.nama_barang,
            kategori_id: this.kategori_id,
            stok: this.stok,
            harga: this.harga
        }

        if (this.editMode) {

            await axios.put(
                'http://localhost:8080/barang/' + this.editId,
                data,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            )

        } else {

            await axios.post(
                'http://localhost:8080/barang',
                data,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            )
        }

        this.nama_barang = ''
        this.kategori_id = ''
        this.stok = ''
        this.harga = ''

        this.editMode = false
        this.editId = null

        this.loadBarang()
    },

    editBarang(item) {

        this.nama_barang = item.nama_barang
        this.kategori_id = item.kategori_id
        this.stok = item.stok
        this.harga = item.harga

        this.editId = item.id
        this.editMode = true
    },

    async hapusBarang(id) {

        const token = localStorage.getItem('token')

        if (confirm('Yakin hapus data?')) {

            await axios.delete(
                'http://localhost:8080/barang/' + id,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            )

            this.loadBarang()
        }
    }

}

 


}