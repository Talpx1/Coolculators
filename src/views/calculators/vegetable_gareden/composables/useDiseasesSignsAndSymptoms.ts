import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useDiseasesSignsAndSymptoms() {
    const { t } = useI18n()

    const diseases_signs_and_symptoms = computed(() => ({
        yellowing_leaves: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.yellowing_leaves'
        ),
        stunted_growth: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.stunted_growth'
        ),
        downy_mildew: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.downy_mildew'
        ),
        wilting_leaves: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.wilting_leaves'
        ),
        spots_on_fruit: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.spots_on_fruit'
        ),
        powdery_mildew: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.powdery_mildew'
        ),
        forked_roots: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.forked_roots'
        ),
        root_maggots: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.root_maggots'
        ),
        black_spots_on_leaves: t(
            'calculators.vegetable_garden.messages.diseases_signs_and_symptoms.black_spots_on_leaves'
        ),
        wilting: t('calculators.vegetable_garden.messages.diseases_signs_and_symptoms.wilting')
    }))

    return diseases_signs_and_symptoms
}
