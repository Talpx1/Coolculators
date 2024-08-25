import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useSoils() {
    const { t } = useI18n()

    const soils = computed(() => ({
        loamy_soil: t('calculators.vegetable_garden.messages.soils.loamy_soil'),
        well_drained_soil: t('calculators.vegetable_garden.messages.soils.well_drained_soil'),
        slightly_acidic_soil: t('calculators.vegetable_garden.messages.soils.slightly_acidic_soil'),
        sandy_loam: t('calculators.vegetable_garden.messages.soils.sandy_loam'),
        sandy_soil: t('calculators.vegetable_garden.messages.soils.sandy_soil')
    }))

    return soils
}
