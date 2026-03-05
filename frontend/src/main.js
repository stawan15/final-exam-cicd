import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'
import { useAuthStore } from './stores/auth'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

// Initialize auth before mounting the app
const authStore = useAuthStore()
authStore.initialize().then(() => {
    app.use(router)
    app.mount('#app')
})
