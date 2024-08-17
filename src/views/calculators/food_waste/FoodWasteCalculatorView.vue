<script setup lang="ts">
import CalculatorPageWrapper from '@/components/functional/CalculatorPageWrapper.vue'
import CountrySelect from '@/components/ui/inputs/CountrySelect.vue'
import NumberInput from '@/components/ui/inputs/NumberInput.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useNewFoodCategoryDataObject, {
    FOOD_CATEGORIES
} from './composables/useNewFoodCategoryDataObject'
import useCountries from '@/composables/useCountries'
import useFoodWasteCalculation from './composables/useFoodWasteCalculation'
import RelatedResources from '@/components/ui/RelatedResources.vue'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'

const { t, n } = useI18n()

const countries = useCountries()
const selectedCountry = ref()

const userInput = useNewFoodCategoryDataObject()

const breakpoints = useBreakpoints(breakpointsTailwind)

const { invalid, errors, calculate, results, loading } = useFoodWasteCalculation(
    selectedCountry,
    userInput
)

function nFormat(val: number) {
    return n(val, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
</script>

<template>
    <CalculatorPageWrapper id="food_waste" application-category="LifestyleApplication">
        <div class="space-y-8 justify-self-stretch">
            <CountrySelect
                :countries
                v-model:selected="selectedCountry"
                :label="t('calculators.shared_messages.country')"
                :invalid="invalid.country"
            />

            <div
                class="grid grid-cols-1 lg:grid-cols-5 gap-x-4 gap-y-16 justify-items-center items-center"
            >
                <header class="hidden lg:contents font-bold">
                    <div>{{ t(`calculators.food_waste.messages.food_category`) }}</div>
                    <div>{{ t(`calculators.food_waste.messages.bought_amount`) }}</div>
                    <div>{{ t(`calculators.food_waste.messages.wasted_amount`) }}</div>
                    <div>{{ t(`calculators.food_waste.messages.paper_packaging_amount`) }}</div>
                    <div>{{ t(`calculators.food_waste.messages.plastic_packaging_amount`) }}</div>
                </header>
                <div
                    class="lg:contents space-y-2"
                    v-for="foodCategory in FOOD_CATEGORIES"
                    :key="foodCategory"
                >
                    <div class="font-bold lg:font-normal">
                        {{ t(`calculators.food_waste.messages.${foodCategory}`) }}
                    </div>
                    <div>
                        <NumberInput
                            :invalid="invalid[`${foodCategory}_bought_amount`]"
                            :max-fraction-digits="1"
                            :step="0.1"
                            suffix=" kg"
                            input-class="max-w-24"
                            :label="
                                breakpoints.isSmaller('lg')
                                    ? t(`calculators.food_waste.messages.bought_amount`)
                                    : ''
                            "
                            :min="0"
                            v-model="userInput[foodCategory].bought_amount"
                            button-layout="horizontal"
                        />
                    </div>
                    <div>
                        <NumberInput
                            :invalid="invalid[`${foodCategory}_wasted_amount`]"
                            :max-fraction-digits="1"
                            :step="0.1"
                            suffix=" kg"
                            input-class="max-w-24"
                            :label="
                                breakpoints.isSmaller('lg')
                                    ? t(`calculators.food_waste.messages.wasted_amount`)
                                    : ''
                            "
                            :min="0"
                            v-model="userInput[foodCategory].wasted_amount"
                            button-layout="horizontal"
                        />
                    </div>
                    <div>
                        <NumberInput
                            input-class="max-w-24"
                            :label="
                                breakpoints.isSmaller('lg')
                                    ? t(`calculators.food_waste.messages.paper_packaging_amount`)
                                    : ''
                            "
                            :min="0"
                            v-model="userInput[foodCategory].paper_packaging_amount"
                            button-layout="horizontal"
                        />
                    </div>
                    <div>
                        <NumberInput
                            input-class="max-w-24"
                            :label="
                                breakpoints.isSmaller('lg')
                                    ? t(`calculators.food_waste.messages.plastic_packaging_amount`)
                                    : ''
                            "
                            :min="0"
                            v-model="userInput[foodCategory].plastic_packaging_amount"
                            button-layout="horizontal"
                        />
                    </div>
                </div>
                <Button :label="t('calculate')" class="lg:col-span-5 w-full" @click="calculate" />
            </div>
        </div>

        <div>
            <span v-if="!results">
                <span v-if="errors.length">
                    <Message v-for="error in errors" :key="error" severity="error" class="mb-2">
                        {{ error }}
                    </Message>
                </span>
                <span v-else-if="loading">{{ t('calculators.shared_messages.calculating') }}.</span>
                <span v-else>{{ t('calculators.shared_messages.insert_data_to_calculate') }}</span>
            </span>
            <i18n-t
                v-else
                class="text-2xl"
                keypath="calculators.food_waste.messages.calculation_results"
                tag="span"
            >
                <template #total_emissions>
                    <b>{{ nFormat(results.total_emissions) }}</b>
                </template>
                <template #total_costs>
                    <b>{{ nFormat(results.total_costs) }}</b>
                </template>
                <template #wasted_emissions>
                    <b>{{ nFormat(results.wasted_emissions) }}</b>
                </template>
                <template #wasted_costs>
                    <b>{{ nFormat(results.wasted_costs) }}</b>
                </template>
                <template #could_have_been_enough_costs>
                    <b>{{ nFormat(results.could_have_been_enough_costs) }}</b>
                </template>
                <template #could_have_been_enough_emissions>
                    <b>{{ nFormat(results.could_have_been_enough_emissions) }}</b>
                </template>
                <template #break> <br /><br /> </template>
            </i18n-t>

            <RelatedResources
                class="mt-8"
                label="calculators.food_waste.messages.sources_on_carbon_footprint_and_prices"
                :resources="[
                    'https://www.co2everything.com/category/food',
                    'https://www.numbeo.com/cost-of-living/prices_by_country.jsp',
                    'https://www.selinawamucii.com/insights/prices/'
                ]"
            />
        </div>

        <div class="flex flex-col gap-16 justify-self-center max-w-full">
            <div>
                <SecondaryHeading>{{
                    t('calculators.food_waste.messages.how_food_waste_gets_calculated')
                }}</SecondaryHeading>
                <TextParagraph>{{
                    t('calculators.food_waste.messages.how_food_waste_gets_calculated_description')
                }}</TextParagraph>
            </div>

            <div>
                <SecondaryHeading>{{
                    t('calculators.food_waste.messages.how_to_reduce_food_waste')
                }}</SecondaryHeading>
                <TextParagraph>{{
                    t('calculators.food_waste.messages.how_to_reduce_food_waste_description')
                }}</TextParagraph>
            </div>

            <div>
                <SecondaryHeading>{{
                    t('calculators.food_waste.messages.how_to_reduce_carbon_footprint_of_our_diet')
                }}</SecondaryHeading>
                <TextParagraph>{{
                    t(
                        'calculators.food_waste.messages.how_to_reduce_carbon_footprint_of_our_diet_description'
                    )
                }}</TextParagraph>
            </div>
        </div>

        <RelatedResources
            :resources="[
                'https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Packaging_waste_statistics#Waste_generation_by_packaging_material',
                'https://www.sciencedirect.com/science/article/pii/S2666833523000011#sec0005'
            ]"
        />
    </CalculatorPageWrapper>
</template>
