// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-green/theme.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

export const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(router)
app.use(VueQueryPlugin)
app.use(ToastService)

app.mount('#app')
