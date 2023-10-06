import '@/style/normalize.css'
import App from './App.vue'
import router from './router'
import i18n from "@/locale";
import { debounce } from "@/utils/debounce";
import { onMounted } from 'vue';

const app = createApp(App)
const pinia = createPinia()

app.directive('debounce', (el, binding) => {    
    el.addEventListener('input', debounce(binding.value.fn, binding.value.duration)) 
})
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
