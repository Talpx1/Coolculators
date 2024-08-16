import useLocalizedRoutePath, {
    type LocalizedRoutesCollection
} from '@/composables/useLocalizedRoutePath'
import type { RouteRecordRaw } from 'vue-router'

function routesToParamRegexp(routes: LocalizedRoutesCollection) {
    return `:localizedPath(${Object.values(routes).join('|')})`
}

const routes: RouteRecordRaw[] = [
    {
        path: '',
        alias: 'home',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },

    {
        path: routesToParamRegexp(useLocalizedRoutePath('calculators.body_mass_index')),
        name: 'calculators.body_mass_index',
        component: () =>
            import('@/views/calculators/body_mass_index/BodyMassIndexCalculatorView.vue')
    },

    {
        path: routesToParamRegexp(useLocalizedRoutePath('calculators.daily_calorie_needs')),
        name: 'calculators.daily_calorie_needs',
        component: () =>
            import('@/views/calculators/daily_calorie_needs/DailyCalorieNeedsCalculator.vue')
    }
]

export default routes
