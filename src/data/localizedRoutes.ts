import type { SupportedLocale } from '@/composables/useLocale'

const localizedRoutes: Record<string, Record<SupportedLocale, string>> = {
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
    },
    'calculators.vegetable_garden': {
        it: 'semina-orto-calcolatore',
        en: 'garden-sowing-calculator'
    }
}

export default localizedRoutes
