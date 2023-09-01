import '@/style/normalize.css'
import App from './App.vue'
import router from './router'
import i18n from "@/locale";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
