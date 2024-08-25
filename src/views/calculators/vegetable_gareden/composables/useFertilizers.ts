import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useFertilizers() {
    const { t } = useI18n()

    const fertilizers = computed(() => ({
        compost: t('calculators.vegetable_garden.messages.fertilizers.compost'),
        organic_nitrogen: t('calculators.vegetable_garden.messages.fertilizers.organic_nitrogen'),
        organic_compost: t('calculators.vegetable_garden.messages.fertilizers.organic_compost'),
        nitrogen_rich_fertilizer: t(
            'calculators.vegetable_garden.messages.fertilizers.nitrogen_rich_fertilizer'
        ),
        balanced_fertilizer: t(
            'calculators.vegetable_garden.messages.fertilizers.balanced_fertilizer'
        ),
        potassium_rich_fertilizer: t(
            'calculators.vegetable_garden.messages.fertilizers.potassium_rich_fertilizer'
        ),
        potash_rich_fertilizer: t(
            'calculators.vegetable_garden.messages.fertilizers.potash_rich_fertilizer'
        )
    }))

    return fertilizers
}
