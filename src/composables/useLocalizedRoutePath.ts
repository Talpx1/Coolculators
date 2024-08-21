import type { SupportedLocale } from './useLocale'

export const routes: Record<string, Record<SupportedLocale, string>> = {
    home: {
        it: '',
        en: ''
    },
    'calculators.body_mass_index': {
        it: 'indice-massa-corporea-calcolatore',
        en: 'body-mass-index-calculator'
    },
    'calculators.daily_calorie_needs': {
        it: 'fabbisogno-calorico-giornaliero-calcolatore',
        en: 'daily-calorie-needs-calculator'
    },
    'calculators.food_waste': {
        it: 'spreco-alimentare-calcolatore',
        en: 'food-waste-calculator'
    }
}

export default function useLocalizedRoutePath(route: string, locale?: SupportedLocale) {
    if (!routes[route]) {
        throw new Error(`[useLocalizedRoutePath] invalid route: ${route}`)
    }

    return locale ? routes[route][locale] : routes[route]
}
