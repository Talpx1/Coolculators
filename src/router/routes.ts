import useLocalizedRoutePath from '@/composables/useLocalizedRoutePath'
import type { RouteRecordRaw } from 'vue-router'

function routesToParamRegexp(routes: any) {
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
    },

    {
        path: routesToParamRegexp(useLocalizedRoutePath('calculators.food_waste')),
        name: 'calculators.food_waste',
        component: () => import('@/views/calculators/food_waste/FoodWasteCalculatorView.vue')
    },

    {
        path: routesToParamRegexp(useLocalizedRoutePath('calculators.vegetable_garden')),
        name: 'calculators.vegetable_garden',
        component: () =>
            import('@/views/calculators/vegetable_gareden/VegetableGardenCalculatorView.vue')
    }
]

export default routes
