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
}

type CalculatorRawEntry = string | ({ id: string } & Partial<CalculatorObject>)

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
            tags: ['tags.health', 'tags.diet']
        },

        {
            id: 'calories',
            tags: ['tags.health', 'tags.diet', 'tags.food']
        },

        'pregnancy',

        'heart_rate',

        'hydration',

        'date_difference',

        'age',

        'time_zone',

        'countdown',

        'work_hours',

        'paint',

        'tile',

        'concrete',

        'insulation',

        'fertilizer',

        'series_and_parallel_resistor',

        'voltage_drop',

        'electrical_power',

        'material_strength',

        'battery_charge_time',

        'grade_point_average',

        'percentage',

        'mileage',

        'fuel_cost',

        'navigation_route',

        'co2_emissions',

        'flight_time',

        'body_fat',

        'macronutrient',

        'ideal_weight',

        'maximum_heart_rate',

        'recovery_time',

        'volume',

        'surface_area',

        'weight',

        'profit_margin',

        'sale_price',

        'break_even_point',

        'car_performance',

        'car_maintenance',

        'car_financing',

        'energy_consumption',

        'solar_panel',

        'carbon_footprint',

        'energy_efficiency',

        'energy_savings'
    ]

    function buildList(): CalculatorObject[] {
        return calculators.map((c) => translateCalculatorObject(buildCalculatorObject(c)))
    }

    const list = ref(buildList())

    watch(locale, () => (list.value = buildList()))

    return list
}
