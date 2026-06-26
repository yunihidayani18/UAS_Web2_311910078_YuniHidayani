const app = Vue.createApp({})

app.config.errorHandler = (err) => {
    console.error(err)
}

app.use(router)

app.mount('#app')