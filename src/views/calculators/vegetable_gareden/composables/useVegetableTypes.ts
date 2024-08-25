import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useVegetableTypes() {
    const { t } = useI18n()

    const vegetable_types = computed(() => ({
        leafy_vegetable: t('calculators.vegetable_garden.messages.vegetable_types.leafy_vegetable'),
        fruit_vegetable: t('calculators.vegetable_garden.messages.vegetable_types.fruit_vegetable'),
        root_vegetable: t('calculators.vegetable_garden.messages.vegetable_types.root_vegetable'),
        bulb_vegetable: t('calculators.vegetable_garden.messages.vegetable_types.bulb_vegetable'),
        tuber_vegetable: t('calculators.vegetable_garden.messages.vegetable_types.tuber_vegetable'),
        stem_vegetable: t('calculators.vegetable_garden.messages.vegetable_types.stem_vegetable'),
        flowering_vegetable: t(
            'calculators.vegetable_garden.messages.vegetable_types.flowering_vegetable'
        ),
        legume: t('calculators.vegetable_garden.messages.vegetable_types.legume'),
        seed_vegetable: t('calculators.vegetable_garden.messages.vegetable_types.seed_vegetable'),
        herb: t('calculators.vegetable_garden.messages.vegetable_types.herb')
    }))

    return vegetable_types
}
