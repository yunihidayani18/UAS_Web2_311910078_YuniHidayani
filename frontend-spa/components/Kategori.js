const Kategori = {

template: `
<div class="container mx-auto mt-10">

    <h1 class="text-2xl font-bold mb-4">
        Data Kategori
    </h1>

    <div class="mb-4">

        <input
            v-model="nama_kategori"
            placeholder="Nama Kategori"
            class="border p-2 mr-2"
        >

        <button
            @click="simpanKategori"
            class="bg-blue-500 text-white px-4 py-2 rounded"
        >
            {{ editMode ? 'Update' : 'Tambah' }}
        </button>

    </div>

    <table class="table-auto border w-full">

        <thead>
            <tr>
                <th class="border p-2">ID</th>
                <th class="border p-2">Nama Kategori</th>
                <th class="border p-2">Aksi</th>
            </tr>
        </thead>

        <tbody>

            <tr
                v-for="item in kategori"
                :key="item.id"
            >
                <td class="border p-2">
                    {{ item.id }}
                </td>

                <td class="border p-2">
                    {{ item.nama_kategori }}
                </td>

                <td class="border p-2">

                    <button
                        @click="editKategori(item)"
                        class="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                        Edit
                    </button>

                    <button
                        @click="hapusKategori(item.id)"
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
        kategori: [],
        nama_kategori: '',
        editMode: false,
        editId: null
    }
},

async mounted() {
    this.loadKategori()
},

methods: {

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

async simpanKategori() {

    const token = localStorage.getItem('token')

    if (this.editMode) {

        await axios.put(
            'http://localhost:8080/kategori/' + this.editId,
            {
                nama_kategori: this.nama_kategori
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

    } else {

        await axios.post(
            'http://localhost:8080/kategori',
            {
                nama_kategori: this.nama_kategori
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
    }

    this.nama_kategori = ''
    this.editMode = false
    this.editId = null

    this.loadKategori()
},

editKategori(item) {

    this.nama_kategori = item.nama_kategori
    this.editId = item.id
    this.editMode = true
},

async hapusKategori(id) {

    const token = localStorage.getItem('token')

    if (confirm('Yakin hapus data?')) {

        await axios.delete(
            'http://localhost:8080/kategori/' + id,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.loadKategori()
    }
}

}

}