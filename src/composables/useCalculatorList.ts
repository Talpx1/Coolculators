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

        { id: 'pregnancy', disabled: true },

        { id: 'heart_rate', disabled: true },

        { id: 'hydration', disabled: true },

        { id: 'date_difference', disabled: true },

        { id: 'age', disabled: true },

        { id: 'time_zone', disabled: true },

        { id: 'countdown', disabled: true },

        { id: 'work_hours', disabled: true },

        { id: 'paint', disabled: true },

        { id: 'tile', disabled: true },

        { id: 'concrete', disabled: true },

        { id: 'insulation', disabled: true },

        { id: 'fertilizer', disabled: true },

        { id: 'series_and_parallel_resistor', disabled: true },

        { id: 'voltage_drop', disabled: true },

        { id: 'electrical_power', disabled: true },

        { id: 'material_strength', disabled: true },

        { id: 'battery_charge_time', disabled: true },

        { id: 'grade_point_average', disabled: true },

        { id: 'percentage', disabled: true },

        { id: 'mileage', disabled: true },

        { id: 'fuel_cost', disabled: true },

        { id: 'navigation_route', disabled: true },

        { id: 'co2_emissions', disabled: true },

        { id: 'flight_time', disabled: true },

        { id: 'body_fat', disabled: true },

        { id: 'macronutrient', disabled: true },

        { id: 'ideal_weight', disabled: true },

        { id: 'maximum_heart_rate', disabled: true },

        { id: 'recovery_time', disabled: true },

        { id: 'volume', disabled: true },

        { id: 'surface_area', disabled: true },

        { id: 'weight', disabled: true },

        { id: 'profit_margin', disabled: true },

        { id: 'sale_price', disabled: true },

        { id: 'break_even_point', disabled: true },

        { id: 'car_performance', disabled: true },

        { id: 'car_maintenance', disabled: true },

        { id: 'car_financing', disabled: true },

        { id: 'energy_consumption', disabled: true },

        { id: 'solar_panel', disabled: true },

        { id: 'carbon_footprint', disabled: true },

        { id: 'energy_efficiency', disabled: true },

        { id: 'energy_savings', disabled: true }
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
