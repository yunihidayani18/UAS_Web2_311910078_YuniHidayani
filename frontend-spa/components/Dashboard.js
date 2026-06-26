const Dashboard = {

template: `
<div class="container mx-auto mt-10">

    <div class="bg-white p-8 rounded-lg shadow">

        <div class="flex justify-between items-center mb-8">

    <div>
        <h1 class="text-4xl font-bold text-gray-800">
            Dashboard Admin
        </h1>

        <p class="text-gray-500">
            Selamat datang di Sistem Informasi Inventaris Barang
        </p>
    </div>

    <button
        @click="logout"
        class="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600"
    >
        🚪 Logout
    </button>

</div>

        <!-- Statistik -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

            <div class="bg-blue-500 text-white p-6 rounded-lg shadow">
                <h2 class="text-lg">📦 Total Barang</h2>
                <p class="text-3xl font-bold">{{ totalBarang }}</p>
            </div>

            <div class="bg-green-500 text-white p-6 rounded-lg shadow">
                <h2 class="text-lg">🏷️ Kategori</h2>
                <p class="text-3xl font-bold">{{ totalKategori }}</p>
            </div>

            <div class="bg-purple-500 text-white p-6 rounded-lg shadow">
                <h2 class="text-lg">🚚 Supplier</h2>
                <p class="text-3xl font-bold">{{ totalSupplier }}</p>
            </div>

            <div class="bg-orange-500 text-white p-6 rounded-lg shadow">
                <h2 class="text-lg">📊 Transaksi</h2>
                <p class="text-3xl font-bold">
                    {{ totalMasuk + totalKeluar }}
                </p>
            </div>

        </div>

        <!-- Menu -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">

            <router-link
                to="/barang"
                class="bg-blue-500 text-white text-center p-4 rounded-lg shadow hover:bg-blue-600"
            >
                📦 Data Barang
            </router-link>

            <router-link
                to="/kategori"
                class="bg-green-500 text-white text-center p-4 rounded-lg shadow hover:bg-green-600"
            >
                🏷️ Data Kategori
            </router-link>

            <router-link
                to="/supplier"
                class="bg-purple-500 text-white text-center p-4 rounded-lg shadow hover:bg-purple-600"
            >
                🚚 Data Supplier
            </router-link>

            <router-link
                to="/barang-masuk"
                class="bg-indigo-500 text-white text-center p-4 rounded-lg shadow hover:bg-indigo-600"
            >
                📥 Barang Masuk
            </router-link>

            <router-link
                to="/barang-keluar"
                class="bg-orange-500 text-white text-center p-4 rounded-lg shadow hover:bg-orange-600"
            >
                📤 Barang Keluar
            </router-link>

            <router-link
                to="/laporan"
                class="bg-teal-500 text-white text-center p-4 rounded-lg shadow hover:bg-teal-600"
            >
                📑 Laporan
            </router-link>

        </div>

    </div>

</div>
`,

data() {
    return {
        totalBarang: 0,
        totalKategori: 0,
        totalSupplier: 0,
        totalMasuk: 0,
        totalKeluar: 0
    }
},

async mounted() {
    this.loadData()
},

methods: {

    async loadData() {

        const token = localStorage.getItem('token')

        const barang = await axios.get(
            'http://localhost:8080/barang',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        const kategori = await axios.get(
            'http://localhost:8080/kategori',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        const supplier = await axios.get(
            'http://localhost:8080/supplier',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        const masuk = await axios.get(
            'http://localhost:8080/barang-masuk',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        const keluar = await axios.get(
            'http://localhost:8080/barang-keluar',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )

        this.totalBarang = barang.data.length
        this.totalKategori = kategori.data.length
        this.totalSupplier = supplier.data.length
        this.totalMasuk = masuk.data.length
        this.totalKeluar = keluar.data.length
    },

    logout() {
        localStorage.removeItem('token')
        router.push('/login')
    }

}

}