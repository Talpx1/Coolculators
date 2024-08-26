import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type Climate = {
    growth_coefficient: number
    name: string
}

export default function useClimates() {
    const { t } = useI18n()

    const climates = computed(() => [
        {
            growth_coefficient: 0.9,
            name: t('calculators.vegetable_garden.messages.climates.tropical')
        },
        {
            growth_coefficient: 0.8,
            name: t('calculators.vegetable_garden.messages.climates.equatorial')
        },
        {
            growth_coefficient: 1.0,
            name: t('calculators.vegetable_garden.messages.climates.subtropical')
        },
        {
            growth_coefficient: 1.0,
            name: t('calculators.vegetable_garden.messages.climates.temperate')
        },
        {
            growth_coefficient: 0.9,
            name: t('calculators.vegetable_garden.messages.climates.humid_temperate')
        },
        {
            growth_coefficient: 0.9,
            name: t('calculators.vegetable_garden.messages.climates.oceanic')
        },
        {
            growth_coefficient: 0.9,
            name: t('calculators.vegetable_garden.messages.climates.mediterranean')
        },
        {
            growth_coefficient: 0.8,
            name: t('calculators.vegetable_garden.messages.climates.continental')
        },
        {
            growth_coefficient: 0.6,
            name: t('calculators.vegetable_garden.messages.climates.subarctic')
        },
        {
            growth_coefficient: 0.5,
            name: t('calculators.vegetable_garden.messages.climates.trans_siberian')
        },
        {
            growth_coefficient: 0.3,
            name: t('calculators.vegetable_garden.messages.climates.polar')
        },
        {
            growth_coefficient: 0.4,
            name: t('calculators.vegetable_garden.messages.climates.snow')
        },
        {
            growth_coefficient: 0.2,
            name: t('calculators.vegetable_garden.messages.climates.glacial')
        },
        {
            growth_coefficient: 0.7,
            name: t('calculators.vegetable_garden.messages.climates.steppe')
        },
        {
            growth_coefficient: 0.5,
            name: t('calculators.vegetable_garden.messages.climates.desert')
        },
        {
            growth_coefficient: 0.8,
            name: t('calculators.vegetable_garden.messages.climates.monsoon')
        },
        {
            growth_coefficient: 0.7,
            name: t('calculators.vegetable_garden.messages.climates.sinic')
        },
        {
            growth_coefficient: 0.6,
            name: t('calculators.vegetable_garden.messages.climates.savannah')
        },
        {
            growth_coefficient: 0.6,
            name: t('calculators.vegetable_garden.messages.climates.alpine')
        },
        {
            growth_coefficient: 0,
            name: t('calculators.vegetable_garden.messages.climates.boreal')
        }
    ])
    return climates
}
