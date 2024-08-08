import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import useLocale, { SUPPORTED_LOCALE_CODES } from '@/composables/useLocale'
import BaseLayout from '@/components/layout/AppLayout.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: () => `/${import.meta.env.VITE_DEFAULT_LOCALE}`
        },
        {
            path: `/:locale(${SUPPORTED_LOCALE_CODES.join('|')})`,
            component: BaseLayout,
            children: routes
        },

        {
            path: '/:pathMatch(.*)*',
            component: NotFoundView
        }
    ]
})

router.beforeEach(async (to, from) => {
    const localeApi = useLocale()

    const newLocale = to.params.locale as string
    const prevLocale = from.params.locale as string

    if (newLocale === prevLocale || !localeApi.isSupportedLocale(newLocale)) {
        return
    }

    localeApi.changeLocale(newLocale)
})

export default router
