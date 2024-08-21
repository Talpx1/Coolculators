import { watch } from 'vue'
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouteLocationRaw } from 'vue-router'
import useLocalizedRoute from './useLocalizedRoute'

export type CalculatorObject = {
    id: string
    title: string
    route: RouteLocationRaw
    tags: string[]
    description: string
    disabled?: boolean
}

type CalculatorRawEntry = { id: string } & Partial<CalculatorObject>

export default function useCalculatorList(): Ref<CalculatorObject[]> {
    const { t, locale } = useI18n()

    function translateCalculatorObject(calculator: CalculatorObject): CalculatorObject {
        return {
            ...calculator,
            title: t(calculator.title),
            tags: calculator.tags.map((tag) => t(tag)),
            description: t(calculator.description)
        }
    }

    function buildCalculatorObject(calculator: CalculatorRawEntry): CalculatorObject {
        const _c = typeof calculator === 'string' ? { id: calculator } : calculator

        return {
            id: _c.id,
            title: _c.title ?? `calculators.${_c.id}.title`,
            route: _c.route ?? useLocalizedRoute(`calculators.${_c.id}`),
            tags: _c.tags ?? [],
            description: _c.description ?? `calculators.${_c.id}.description`
        }
    }

    const calculators: CalculatorRawEntry[] = [
        {
            id: 'body_mass_index',
            tags: [
                'tags.health',
                'tags.diet',
                'tags.fitness',
                'tags.wellness',
                'tags.weight',
                'tags.body',
                'tags.monitoring'
            ]
        },

        {
            id: 'daily_calorie_needs',
            tags: [
                'tags.health',
                'tags.diet',
                'tags.nutrition',
                'tags.fitness',
                'tags.wellness',
                'tags.food',
                'tags.physical_activity'
            ]
        },

        {
            id: 'food_waste',
            tags: [
                'tags.food_waste',
                'tags.sustainability',
                'tags.environment',
                'tags.carbon_footprint',
                'tags.eco_friendly',
                'tags.cost_saving',
                'tags.packaging',
                'tags.waste_reduction',
                'tags.emissions',
                'tags.climate_change',
                'tags.resource_management',
                'tags.responsible_consumption'
            ]
        }
    ]

    function buildList(): CalculatorObject[] {
        return calculators
            .filter((c) => !c.disabled)
            .map((c) => translateCalculatorObject(buildCalculatorObject(c)))
    }

    const list = ref(buildList())

    watch(locale, () => (list.value = buildList()))

    return list
}
