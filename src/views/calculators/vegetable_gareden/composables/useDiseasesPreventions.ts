import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useDiseasesPreventions() {
    const { t } = useI18n()

    const diseases_preventions = computed(() => ({
        use_disease_resistant_varieties: t(
            'calculators.vegetable_garden.messages.diseases_preventions.use_disease_resistant_varieties'
        ),
        rotate_crops: t('calculators.vegetable_garden.messages.diseases_preventions.rotate_crops'),
        ensure_proper_spacing: t(
            'calculators.vegetable_garden.messages.diseases_preventions.ensure_proper_spacing'
        ),
        use_disease_resistant_seeds: t(
            'calculators.vegetable_garden.messages.diseases_preventions.use_disease_resistant_seeds'
        ),
        ensure_good_air_circulation: t(
            'calculators.vegetable_garden.messages.diseases_preventions.ensure_good_air_circulation'
        ),
        avoid_overhead_watering: t(
            'calculators.vegetable_garden.messages.diseases_preventions.avoid_overhead_watering'
        ),
        water_at_the_base_of_the_plant: t(
            'calculators.vegetable_garden.messages.diseases_preventions.water_at_the_base_of_the_plant'
        ),
        avoid_soil_compaction: t(
            'calculators.vegetable_garden.messages.diseases_preventions.avoid_soil_compaction'
        ),
        use_row_covers: t(
            'calculators.vegetable_garden.messages.diseases_preventions.use_row_covers'
        ),
        use_certified_disease_free_seeds: t(
            'calculators.vegetable_garden.messages.diseases_preventions.use_certified_disease_free_seeds'
        )
    }))

    return diseases_preventions
}
