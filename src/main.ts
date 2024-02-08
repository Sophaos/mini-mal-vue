// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-dark-green/theme.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { staleTime: 3600000 } }
  }
}

export const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(ToastService)

app.mount('#app')
