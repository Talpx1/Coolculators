import type { Country } from '@/composables/useCountries'
import { ref, type Ref } from 'vue'
import { FOOD_CATEGORIES, type UserFoodData } from './useNewFoodCategoryDataObject'
import { useI18n } from 'vue-i18n'

type CalculatedWastes = {
    total_emissions: number
    total_costs: number
    wasted_emissions: number
    wasted_costs: number
    could_have_been_enough_costs: number
    could_have_been_enough_emissions: number
    km_in_car_equivalent: number
}

const AVG_PAPER_BAG_CO2E = 5.52
const AVG_PLASTIC_BAG_CO2E = 1.58
const AVG_CO2E_PER_KM_IN_CAR = 0.196974607

const foodCategoriesInfo: Record<
    string,
    { average_emissions_per_kg: number; cost_per_country: Record<string, number> }
> = {
    //https://www.co2everything.com/category/food
    meat: {
        average_emissions_per_kg: 15.5, //https://www.co2everything.com/co2e-of/beef
        cost_per_country: {
            // https://www.numbeo.com/cost-of-living/prices_by_country.jsp?displayCurrency=EUR&itemId=121
            fr: 18.89,
            de: 16.23,
            it: 16.87,
            nl: 14.96,
            es: 13.51,
            us: 14.52,
            uk: 12.27
        }
    },
    fruits: {
        average_emissions_per_kg: 0.22, //https://www.co2everything.com/co2e-of/berries
        cost_per_country: {
            //https://www.numbeo.com/cost-of-living/prices_by_country.jsp?itemId=110&displayCurrency=EUR
            fr: 2.77,
            de: 2.63,
            it: 2.08,
            nl: 1.77,
            es: 2.0,
            us: 4.8,
            uk: 2.52
        }
    },
    vegetables: {
        average_emissions_per_kg: 0.32, //https://www.co2everything.com/co2e-of/tomato
        cost_per_country: {
            //https://www.numbeo.com/cost-of-living/prices_by_country.jsp?itemId=116&displayCurrency=EUR
            fr: 3.33,
            de: 3.19,
            it: 2.79,
            nl: 3.39,
            es: 2.21,
            us: 4.46,
            uk: 3.17
        }
    },
    dairy: {
        average_emissions_per_kg: 2.79, //https://www.co2everything.com/co2e-of/cheese
        cost_per_country: {
            //https://www.numbeo.com/cost-of-living/prices_by_country.jsp?displayCurrency=EUR&itemId=8
            fr: 1.15,
            de: 1.04,
            it: 1.45,
            nl: 1.1,
            es: 1.04,
            us: 1.45,
            uk: 0.96
        }
    },
    seafood: {
        average_emissions_per_kg: 4.07, //https://www.co2everything.com/co2e-of/prawns
        cost_per_country: {
            //https://www.selinawamucii.com/insights/prices/
            fr: 7.56,
            de: 11.19,
            it: 10.31,
            nl: 35.37,
            es: 52.33,
            us: 17.88,
            uk: 11.43
        }
    },
    grains: {
        average_emissions_per_kg: 0.9,
        cost_per_country: {
            //https://www.selinawamucii.com/insights/prices/
            fr: 4.41,
            de: 1.08,
            it: 1.04,
            nl: 2.27,
            es: 0.49,
            us: 1.81,
            uk: 7.68
        }
    },
    sweets_and_snacks: {
        average_emissions_per_kg: 1.22, //nuts + berries + dark chocolate
        cost_per_country: {
            fr: 20.16,
            de: 36.9,
            it: 22.29,
            nl: 36.11,
            es: 37.05,
            us: 11.62,
            uk: 7.83
        }
    }
}

export default function useFoodWasteCalculation(
    selectedCountry: Ref<Country>,
    foodUserInput: Ref<UserFoodData>
) {
    const { t } = useI18n()
    const loading = ref(false)
    const results = ref<CalculatedWastes>()
    const invalid = ref<Record<string, boolean>>({})
    const errors = ref<string[]>([])

    function validateData() {
        if (!selectedCountry.value) {
            invalid.value = { country: true }
            errors.value.push(t('select_a_country'))
        }

        FOOD_CATEGORIES.forEach((foodCategory) => {
            const userFoodCategoryData = foodUserInput.value[foodCategory]
            if (userFoodCategoryData.bought_amount < userFoodCategoryData.wasted_amount) {
                invalid.value = {
                    ...invalid.value,
                    [`${foodCategory}_bought_amount`]: true,
                    [`${foodCategory}_wasted_amount`]: true
                }

                errors.value.push(
                    `${t(`calculators.food_waste.messages.${foodCategory}`)}: ${t('calculators.food_waste.messages.wasted_amount_cant_be_greater_than_bought_amount')}`
                )
            }
        })

        return Object.keys(invalid.value).length <= 0
    }

    function calculate() {
        invalid.value = {}
        errors.value = []

        if (!validateData()) {
            return
        }

        loading.value = true

        const wastes: CalculatedWastes = {
            total_emissions: 0,
            total_costs: 0,
            wasted_emissions: 0,
            wasted_costs: 0,
            could_have_been_enough_costs: 0,
            could_have_been_enough_emissions: 0,
            km_in_car_equivalent: 0
        }

        wastes.total_costs = FOOD_CATEGORIES.reduce((costsAccumulator, foodCategory) => {
            const foodCategoryAvgCostInCountry =
                foodCategoriesInfo[foodCategory].cost_per_country[selectedCountry.value.code]
            const userFoodCategoryData = foodUserInput.value[foodCategory]
            return (
                costsAccumulator + userFoodCategoryData.bought_amount * foodCategoryAvgCostInCountry
            )
        }, 0)
        wastes.total_emissions = FOOD_CATEGORIES.reduce((emissionsAccumulator, foodCategory) => {
            const foodCategoryAvgEmissions =
                foodCategoriesInfo[foodCategory].average_emissions_per_kg
            const userFoodCategoryData = foodUserInput.value[foodCategory]
            return (
                emissionsAccumulator +
                (userFoodCategoryData.bought_amount * foodCategoryAvgEmissions +
                    userFoodCategoryData.paper_packaging_amount * AVG_PAPER_BAG_CO2E +
                    userFoodCategoryData.plastic_packaging_amount * AVG_PLASTIC_BAG_CO2E)
            )
        }, 0)

        wastes.wasted_emissions = FOOD_CATEGORIES.reduce((emissionsAccumulator, foodCategory) => {
            const foodCategoryAvgEmissions =
                foodCategoriesInfo[foodCategory].average_emissions_per_kg
            const userFoodCategoryData = foodUserInput.value[foodCategory]
            return (
                emissionsAccumulator +
                (userFoodCategoryData.wasted_amount * foodCategoryAvgEmissions +
                    userFoodCategoryData.paper_packaging_amount * AVG_PAPER_BAG_CO2E +
                    userFoodCategoryData.plastic_packaging_amount * AVG_PLASTIC_BAG_CO2E)
            )
        }, 0)

        wastes.wasted_costs = FOOD_CATEGORIES.reduce((costsAccumulator, foodCategory) => {
            const foodCategoryAvgCostInCountry =
                foodCategoriesInfo[foodCategory].cost_per_country[selectedCountry.value.code]
            const userFoodCategoryData = foodUserInput.value[foodCategory]
            return (
                costsAccumulator + userFoodCategoryData.wasted_amount * foodCategoryAvgCostInCountry
            )
        }, 0)

        wastes.could_have_been_enough_costs = wastes.total_costs - wastes.wasted_costs
        wastes.could_have_been_enough_emissions = wastes.total_emissions - wastes.wasted_emissions
        wastes.km_in_car_equivalent = wastes.wasted_emissions * AVG_CO2E_PER_KM_IN_CAR

        results.value = wastes
        loading.value = false
    }

    return {
        loading,
        results,
        invalid,
        errors,
        calculate
    }
}
