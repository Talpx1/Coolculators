import { ref, type Ref } from 'vue'
import type { Vegetable } from './useVegetables'
import type { VegetableGardenUserInput } from '../VegetableGardenCalculatorView.vue'
import { useI18n } from 'vue-i18n'
import type { Climate } from './useClimates'

type Result = {
    vegetableId: string
    text: string
    variables: {
        plant_amount: number
        required_space: number
        harvest_amount: number
    }
}

export default function useVegetableGardenCalculation(
    selectedClimate: Ref<Climate | undefined>,
    selectedVegetables: Ref<Vegetable[] | undefined>,
    userInput: Ref<VegetableGardenUserInput[]>
) {
    const errors = ref<string[]>([])
    const results = ref<Result[]>([])
    const invalid = ref<Record<string, boolean>>({})
    const { t } = useI18n()

    function resetState() {
        results.value = []
        errors.value = []
        invalid.value = {}
    }

    function validateData() {
        if (!selectedClimate.value) {
            errors.value.push(t('calculators.vegetable_garden.messages.select_a_climate'))
            invalid.value = { ...invalid.value, climate: true }
        }
        if (!selectedVegetables.value) {
            errors.value.push(t('calculators.vegetable_garden.messages.no_vegetables_selected'))
            invalid.value = { ...invalid.value, vegetables: true }
        }

        if (
            userInput.value
                .map((k) => !k.calculation_type || !k.available_space || !k.desired_harvest)
                .some((x) => x === true)
        ) {
            errors.value.push(t('calculators.vegetable_garden.messages.missing_user_data'))
        }

        return errors.value.length <= 0
    }

    function calculate() {
        resetState()
        if (!validateData()) {
            return null
        }

        userInput.value.forEach((vegetableInputData) => {
            const vegetableData = selectedVegetables.value?.find(
                (v) => v.id === vegetableInputData.id
            )!

            switch (vegetableInputData.calculation_type) {
                default:
                    errors.value.push(t('calculators.shared_messages.calculation_error'))
                    return

                case 'byAvailableSpace': {
                    const plantAmount = Math.floor(
                        vegetableInputData.available_space / vegetableData.space_required_m2
                    )
                    results.value.push({
                        vegetableId: vegetableData.id,
                        text: 'calculators.vegetable_garden.messages.results.by_available_space',
                        variables: {
                            plant_amount: plantAmount,
                            required_space: vegetableInputData.available_space,
                            harvest_amount:
                                plantAmount *
                                vegetableData.yield_kg_per_plant *
                                selectedClimate.value!.growth_coefficient
                        }
                    })
                    return
                }

                case 'byHarvestAmount': {
                    const plantAmount = Math.ceil(
                        vegetableInputData.desired_harvest /
                            (vegetableData.yield_kg_per_plant *
                                selectedClimate.value!.growth_coefficient)
                    )
                    results.value.push({
                        vegetableId: vegetableData.id,
                        text: 'calculators.vegetable_garden.messages.results.by_harvest_amount',
                        variables: {
                            plant_amount: plantAmount,
                            required_space: plantAmount * vegetableData.space_required_m2,
                            harvest_amount: vegetableInputData.desired_harvest
                        }
                    })
                    return
                }
            }
        })
    }

    return {
        results,
        invalid,
        errors,
        calculate
    }
}
