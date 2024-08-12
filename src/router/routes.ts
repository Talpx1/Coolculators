import useLocalizedRoutePath from '@/composables/useLocalizedRoutePath'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '',
        alias: 'home',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },

    {
        path: useLocalizedRoutePath('calculators.body_mass_index'),
        name: 'calculators.body_mass_index',
        component: () =>
            import('@/views/calculators/body_mass_index/BodyMassIndexCalculatorView.vue')
    }
]

export default routes
