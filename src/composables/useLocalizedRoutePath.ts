import type { SupportedLocale } from './useLocale'

export default function useLocalizedRoutePath(route: string, locale?: SupportedLocale) {
    const routes: Record<string, Record<SupportedLocale, string>> = {
        home: {
            it: '',
            en: ''
        },
        'calculators.body_mass_index': {
            it: 'indice-massa-corporea-calcolatore',
            en: 'body-mass-index-calculator'
        },
        'calculators.calories': {
            it: '',
            en: ''
        },
        'calculators.pregnancy': {
            it: '',
            en: ''
        },
        'calculators.heart_rate': {
            it: '',
            en: ''
        },
        'calculators.hydration': {
            it: '',
            en: ''
        },
        'calculators.date_difference': {
            it: '',
            en: ''
        },
        'calculators.age': {
            it: '',
            en: ''
        },
        'calculators.time_zone': {
            it: '',
            en: ''
        },
        'calculators.countdown': {
            it: '',
            en: ''
        },
        'calculators.work_hours': {
            it: '',
            en: ''
        },
        'calculators.paint': {
            it: '',
            en: ''
        },
        'calculators.tile': {
            it: '',
            en: ''
        },
        'calculators.concrete': {
            it: '',
            en: ''
        },
        'calculators.insulation': {
            it: '',
            en: ''
        },
        'calculators.fertilizer': {
            it: '',
            en: ''
        },
        'calculators.series_and_parallel_resistor': {
            it: '',
            en: ''
        },
        'calculators.voltage_drop': {
            it: '',
            en: ''
        },
        'calculators.electrical_power': {
            it: '',
            en: ''
        },
        'calculators.material_strength': {
            it: '',
            en: ''
        },
        'calculators.battery_charge_time': {
            it: '',
            en: ''
        },
        'calculators.grade_point_average': {
            it: '',
            en: ''
        },
        'calculators.percentage': {
            it: '',
            en: ''
        },
        'calculators.mileage': {
            it: '',
            en: ''
        },
        'calculators.fuel_cost': {
            it: '',
            en: ''
        },
        'calculators.navigation_route': {
            it: '',
            en: ''
        },
        'calculators.co2_emissions': {
            it: '',
            en: ''
        },
        'calculators.flight_time': {
            it: '',
            en: ''
        },
        'calculators.body_fat': {
            it: '',
            en: ''
        },
        'calculators.macronutrient': {
            it: '',
            en: ''
        },
        'calculators.ideal_weight': {
            it: '',
            en: ''
        },
        'calculators.maximum_heart_rate': {
            it: '',
            en: ''
        },
        'calculators.recovery_time': {
            it: '',
            en: ''
        },
        'calculators.volume': {
            it: '',
            en: ''
        },
        'calculators.surface_area': {
            it: '',
            en: ''
        },
        'calculators.weight': {
            it: '',
            en: ''
        },
        'calculators.profit_margin': {
            it: '',
            en: ''
        },
        'calculators.sale_price': {
            it: '',
            en: ''
        },
        'calculators.break_even_point': {
            it: '',
            en: ''
        },
        'calculators.car_performance': {
            it: '',
            en: ''
        },
        'calculators.car_maintenance': {
            it: '',
            en: ''
        },
        'calculators.car_financing': {
            it: '',
            en: ''
        },
        'calculators.energy_consumption': {
            it: '',
            en: ''
        },
        'calculators.solar_panel': {
            it: '',
            en: ''
        },
        'calculators.carbon_footprint': {
            it: '',
            en: ''
        },
        'calculators.energy_efficiency': {
            it: '',
            en: ''
        },
        'calculators.energy_savings': {
            it: '',
            en: ''
        }
    }

    if (!routes[route]) {
        throw new Error(`[useLocalizedRoutePath] invalid route: ${route}`)
    }

    return locale
        ? routes[route][locale]
        : `:localizedPath(${Object.values(routes[route]).join('|')})`
}
