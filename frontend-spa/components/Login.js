const Login = {

template: `
<div class="container mx-auto mt-10">

    <div class="bg-white p-6 rounded shadow max-w-md mx-auto">

        <h2 class="text-2xl font-bold mb-4">
            Login
        </h2>

        <input
            v-model="username"
            placeholder="Username"
            class="border p-2 w-full mb-3"
        >

        <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="border p-2 w-full mb-3"
        >

        <button
            @click="login"
            class="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Login
        </button>

    </div>

</div>
`,

data() {
    return {
        username: '',
        password: ''
    }
},

methods: {

async login() {

try {

const response = await axios.post(
'http://localhost:8080/login',
{
    username: this.username,
    password: this.password
},
{
    headers: {
        'Content-Type': 'application/json'
    }
}
)

localStorage.setItem(
'token',
response.data.token
)

alert('Login berhasil')

router.push('/dashboard')

}
catch(error)
{
    console.log(error)
    console.log(error.response)
    console.log(error.message)

    alert(error.message)
}
}

}

}