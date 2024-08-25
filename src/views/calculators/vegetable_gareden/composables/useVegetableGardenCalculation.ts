import type { Country } from '@/composables/useCountries'
import { ref, type Ref } from 'vue'
import type { Vegetable } from './useVegetables'
import type { VegetableGardenUserInput } from '../VegetableGardenCalculatorView.vue'
import { useI18n } from 'vue-i18n'

type Result = {
    vegetable: Vegetable
    text: string
    variables: {
        cost: number
        plant_amount: number
        required_space: number
        harvest_amount: number
    }
}

export default function useVegetableGardenCalculation(
    selectedCountry: Ref<Country | undefined>,
    selectedVegetables: Ref<Vegetable[] | undefined>,
    userInput: Ref<VegetableGardenUserInput>
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
        if (!selectedCountry.value) {
            errors.value.push(t('select_a_country'))
            invalid.value = { ...invalid.value, country: true }
        }
        if (!selectedVegetables.value) {
            errors.value.push(t('calculators.vegetable_garden.messages.no_vegetables_selected'))
            invalid.value = { ...invalid.value, vegetables: true }
        }

        if (
            Object.keys(userInput.value)
                .map(
                    (k) =>
                        !userInput.value[k].calculation_type ||
                        !userInput.value[k].available_space ||
                        !userInput.value[k].available_budget ||
                        !userInput.value[k].desired_harvest
                )
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

        Object.keys(userInput.value).forEach((vegetableId) => {
            const vegetableInputData = userInput.value[vegetableId]
            const vegetableData = selectedVegetables.value?.filter((v) => v.id === vegetableId)[0]!

            switch (vegetableInputData.calculation_type) {
                default:
                    errors.value.push(t('calculators.shared_messages.calculation_error'))
                    return

                case 'byPrice': {
                    const plantAmount = Math.floor(
                        vegetableInputData.available_budget /
                            vegetableData.cost[selectedCountry.value!.code]
                    )
                    results.value.push({
                        vegetable: vegetableData,
                        text: 'calculators.vegetable_garden.messages.results.by_price',
                        variables: {
                            cost: vegetableInputData.available_budget,
                            plant_amount: plantAmount,
                            required_space: plantAmount * vegetableData.space_required_cm2,
                            harvest_amount: plantAmount * vegetableData.yield_kg_per_plant
                        }
                    })
                    return
                }

                case 'byAvailableSpace': {
                    const plantAmount = Math.floor(
                        vegetableInputData.available_space / vegetableData.space_required_cm2
                    )
                    results.value.push({
                        vegetable: vegetableData,
                        text: 'calculators.vegetable_garden.messages.results.by_available_space',
                        variables: {
                            cost: plantAmount * vegetableData.cost[selectedCountry.value!.code],
                            plant_amount: plantAmount,
                            required_space: vegetableInputData.available_space,
                            harvest_amount: plantAmount * vegetableData.yield_kg_per_plant
                        }
                    })
                    return
                }

                case 'byHarvestAmount': {
                    const plantAmount = Math.ceil(
                        vegetableInputData.desired_harvest / vegetableData.yield_kg_per_plant
                    )
                    results.value.push({
                        vegetable: vegetableData,
                        text: 'calculators.vegetable_garden.messages.results.by_harvest_amount',
                        variables: {
                            cost: plantAmount * vegetableData.cost[selectedCountry.value!.code],
                            plant_amount: plantAmount,
                            required_space: plantAmount * vegetableData.space_required_cm2,
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
