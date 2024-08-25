import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useDiseasesTreatments() {
    const { t } = useI18n()

    const diseases_treatments = computed(() => ({
        apply_organic_fungicide: t(
            'calculators.vegetable_garden.messages.diseases_treatments.apply_organic_fungicide'
        ),
        remove_affected_plants: t(
            'calculators.vegetable_garden.messages.diseases_treatments.remove_affected_plants'
        ),
        apply_fungicide: t(
            'calculators.vegetable_garden.messages.diseases_treatments.apply_fungicide'
        ),
        remove_infected_leaves: t(
            'calculators.vegetable_garden.messages.diseases_treatments.remove_infected_leaves'
        ),
        apply_copper_fungicide: t(
            'calculators.vegetable_garden.messages.diseases_treatments.apply_copper_fungicide'
        ),
        remove_diseased_parts: t(
            'calculators.vegetable_garden.messages.diseases_treatments.remove_diseased_parts'
        ),
        apply_neem_oil: t(
            'calculators.vegetable_garden.messages.diseases_treatments.apply_neem_oil'
        ),
        remove_infected_parts: t(
            'calculators.vegetable_garden.messages.diseases_treatments.remove_infected_parts'
        ),
        use_organic_nematode_control: t(
            'calculators.vegetable_garden.messages.diseases_treatments.use_organic_nematode_control'
        ),
        apply_insecticidal_soap: t(
            'calculators.vegetable_garden.messages.diseases_treatments.apply_insecticidal_soap'
        ),
        remove_and_destroy_infected_plants: t(
            'calculators.vegetable_garden.messages.diseases_treatments.remove_and_destroy_infected_plants'
        )
    }))

    return diseases_treatments
}
