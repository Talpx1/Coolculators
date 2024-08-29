import type { RouteLocationRaw } from 'vue-router'

export type CalculatorObject = {
    id: string
    title: string
    route: RouteLocationRaw
    tags: string[]
    description: string
    disabled?: boolean
}

export type CalculatorRawEntry = { id: string } & Partial<CalculatorObject>

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
    },

    {
        id: 'vegetable_garden',
        tags: [
            'tags.urban_gardening',
            'tags.self_sufficiency',
            'tags.home_gardening',
            'tags.local_food_production',
            'tags.agriculture',
            'tags.organic_gardening',
            'tags.sustainability',
            'tags.eco_friendly',
            'tags.resource_management',
            'tags.responsible_consumption',
            'tags.food',
            'tags.environment'
        ]
    }
]

export default calculators
