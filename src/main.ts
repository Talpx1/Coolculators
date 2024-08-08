import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara'
import router from './router'
import { i18n } from './composables/useLocale'
import ToastService from 'primevue/toastservice'

export const APP_TITLE = import.meta.env.VITE_APP_TITLE

createApp(App)
    .use(i18n)
    .use(router)
    .use(PrimeVue, {
        unstyled: true,
        pt: Lara,
        ripple: true
    })
    .use(ToastService)
    .mount('#app')
