const Supplier = {

template: `
<div class="container mx-auto mt-10">

    <h1 class="text-2xl font-bold mb-4">
        Data Supplier
    </h1>

    <div class="mb-4">

        <input
            v-model="nama_supplier"
            placeholder="Nama Supplier"
            class="border p-2 mr-2"
        >

        <input
            v-model="alamat"
            placeholder="Alamat"
            class="border p-2 mr-2"
        >

        <input
            v-model="telepon"
            placeholder="Telepon"
            class="border p-2 mr-2"
        >

        <button
            @click="simpanSupplier"
            class="bg-blue-500 text-white px-4 py-2 rounded"
        >
            {{ editMode ? 'Update' : 'Tambah' }}
        </button>

    </div>

    <table class="table-auto border w-full">

        <thead>
            <tr>
                <th class="border p-2">ID</th>
                <th class="border p-2">Nama Supplier</th>
                <th class="border p-2">Alamat</th>
                <th class="border p-2">Telepon</th>
                <th class="border p-2">Aksi</th>
            </tr>
        </thead>

        <tbody>

            <tr
                v-for="item in supplier"
                :key="item.id"
            >
                <td class="border p-2">{{ item.id }}</td>
                <td class="border p-2">{{ item.nama_supplier }}</td>
                <td class="border p-2">{{ item.alamat }}</td>
                <td class="border p-2">{{ item.telepon }}</td>

                <td class="border p-2">

                    <button
                        @click="editSupplier(item)"
                        class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                        Edit
                    </button>

                    <button
                        @click="hapusSupplier(item.id)"
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
        supplier: [],
        nama_supplier: '',
        alamat: '',
        telepon: '',
        editMode: false,
        editId: null
    }
},

async mounted() {
    this.loadSupplier()
},

methods: {

    async loadSupplier() {

        const token = localStorage.getItem('token')

        const response = await axios.get(
            'http://localhost:8080/supplier',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.supplier = response.data
    },

    async simpanSupplier() {

    const token = localStorage.getItem('token')

    const data = {
        nama_supplier: this.nama_supplier,
        alamat: this.alamat,
        telepon: this.telepon
    }

    if (this.editMode) {

        await axios.put(
            'http://localhost:8080/supplier/' + this.editId,
            data,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

    } else {

        await axios.post(
            'http://localhost:8080/supplier',
            data,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
    }

    this.nama_supplier = ''
    this.alamat = ''
    this.telepon = ''

    this.editMode = false
    this.editId = null

    this.loadSupplier()
},

    editSupplier(item) {

    this.nama_supplier = item.nama_supplier
    this.alamat = item.alamat
    this.telepon = item.telepon

    this.editId = item.id
    this.editMode = true
},

async hapusSupplier(id) {

    const token = localStorage.getItem('token')

    if (confirm('Yakin hapus data?')) {

        await axios.delete(
            'http://localhost:8080/supplier/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.loadSupplier()
    }
}

}

}