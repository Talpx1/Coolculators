import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara'
import router from './router'
import { i18n } from './composables/useLocale'
import ToastService from 'primevue/toastservice'
import { createHead } from '@unhead/vue'
import { InferSeoMetaPlugin } from '@unhead/addons'

export const APP_TITLE = import.meta.env.VITE_APP_TITLE

const head = createHead({ plugins: [InferSeoMetaPlugin()] })

createApp(App)
    .use(i18n)
    .use(router)
    .use(PrimeVue, {
        unstyled: true,
        pt: Lara,
        ripple: true
    })
    .use(ToastService)
    .use(head)
    .mount('#app')
