<script setup lang="ts">
import CalculatorPageWrapper from '@/components/functional/CalculatorPageWrapper.vue'
import useVegetables, { type Vegetable } from './composables/useVegetables'
import { useI18n } from 'vue-i18n'
import I18nTranslator from '@/components/i18n/I18nTranslator.vue'
import useCountries, { type Country } from '@/composables/useCountries'
import { computed, ref } from 'vue'
import CountrySelect from '@/components/ui/inputs/CountrySelect.vue'
import MultiSelectInput from '@/components/ui/inputs/MultiSelectInput.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import RadioInput from '@/components/ui/inputs/RadioInput.vue'
import NumberInput from '@/components/ui/inputs/NumberInput.vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import useVegetableGardenCalculation from './composables/useVegetableGardenCalculation'
import Card from 'primevue/card'
import Fieldset from 'primevue/fieldset'

type CalculationType = 'byPrice' | 'byAvailableSpace' | 'byHarvestAmount'

const { t, n } = useI18n()

const vegetables = useVegetables()

const selectedCountry = ref<Country>()
const countries = useCountries()

const selectedVegetables = ref<Vegetable[]>()

export type VegetableGardenUserInput = Record<
    string,
    {
        calculation_type: CalculationType
        available_space: number
        available_budget: number
        desired_harvest: number
    }
>
const userInput = ref<VegetableGardenUserInput>({})

const { results, calculate, errors, invalid } = useVegetableGardenCalculation(
    selectedCountry,
    selectedVegetables,
    userInput
)

const breakpoints = useBreakpoints(breakpointsTailwind)
const radioBntsOrientation = computed(() =>
    breakpoints.isSmallerOrEqual('md') ? 'vertical' : 'horizontal'
)
</script>

<template>
    <CalculatorPageWrapper id="vegetable_garden" application-category="HomeApplication">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <I18nTranslator
                keypath="calculators.vegetable_garden.messages.intro"
                tag="h3"
                class="text-center lg:col-span-2"
            />

            <CountrySelect
                :invalid="invalid.country"
                :countries
                v-model:selected="selectedCountry"
                :label="t('calculators.shared_messages.country')"
            />

            <MultiSelectInput
                :invalid="invalid.vegetables"
                data-key="id"
                :label="t('calculators.vegetable_garden.messages.vegetables_lbl')"
                v-model:selected="selectedVegetables"
                :options="vegetables"
                option-label="name"
                filter
                :placeholder="t('calculators.vegetable_garden.messages.select_vegetables')"
                @update:selected="
                    () =>
                        selectedVegetables?.forEach(
                            (v) =>
                                (userInput[v.id] = {
                                    calculation_type: 'byAvailableSpace',
                                    available_space: v.space_required_cm2,
                                    available_budget: selectedCountry?.code
                                        ? v.cost[selectedCountry.code]
                                        : 1,
                                    desired_harvest: v.yield_kg_per_plant
                                })
                        )
                "
            />

            <div
                v-for="vegetable in selectedVegetables"
                :key="vegetable.id"
                class="mb-8 lg:col-span-2"
            >
                <b>{{ vegetable.name }}:</b>
                <div class="ml-2 py-2 pl-4 border-l-2 border-primary space-y-4">
                    <RadioInput
                        :orientation="radioBntsOrientation"
                        v-model="userInput[vegetable.id].calculation_type"
                        :groupLabel="
                            t(
                                'calculators.vegetable_garden.messages.what_to_base_the_calculation_on'
                            )
                        "
                        :entries="[
                            {
                                label: t(
                                    'calculators.vegetable_garden.messages.calculation_by_price'
                                ),
                                value: 'byPrice'
                            },
                            {
                                label: t(
                                    'calculators.vegetable_garden.messages.calculation_by_available_space'
                                ),
                                value: 'byAvailableSpace'
                            },
                            {
                                label: t(
                                    'calculators.vegetable_garden.messages.calculation_by_harvest_amount'
                                ),
                                value: 'byHarvestAmount'
                            }
                        ]"
                    />

                    <NumberInput
                        v-if="userInput[vegetable.id].calculation_type === 'byAvailableSpace'"
                        suffix=" cm²"
                        input-class="max-w-24"
                        :label="t(`calculators.vegetable_garden.messages.available_space`)"
                        :min="vegetable.space_required_cm2"
                        v-model="userInput[vegetable.id].available_space"
                        button-layout="horizontal"
                    />
                    <NumberInput
                        v-else-if="userInput[vegetable.id].calculation_type === 'byHarvestAmount'"
                        suffix=" kg"
                        :step="0.1"
                        :max-fraction-digits="1"
                        input-class="max-w-24"
                        :label="t(`calculators.vegetable_garden.messages.desired_harvest`)"
                        :min="vegetable.yield_kg_per_plant"
                        v-model="userInput[vegetable.id].desired_harvest"
                        button-layout="horizontal"
                    />
                    <NumberInput
                        v-else
                        suffix=" €"
                        input-class="max-w-24"
                        :label="t(`calculators.vegetable_garden.messages.available_budget`)"
                        :min="selectedCountry?.code ? vegetable.cost[selectedCountry.code] : 1"
                        v-model="userInput[vegetable.id].available_budget"
                        button-layout="horizontal"
                    />
                </div>
            </div>

            <Button :label="t('calculate')" class="lg:col-span-2" @click="calculate" />
        </div>

        <div>
            <span v-if="errors.length">
                <Message v-for="error in errors" :key="error" severity="error" class="mb-2">
                    {{ error }}
                </Message>
            </span>
            <div v-else-if="results.length" class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <Card v-for="result in results" :key="result.vegetable.id" class="flex flex-col">
                    <template #title
                        ><span class="font-bold text-xl">{{
                            result.vegetable.name
                        }}</span></template
                    >

                    <template #content>
                        <I18nTranslator :keypath="result.text" tag="span">
                            <template #cost>
                                <b>{{
                                    n(result.variables.cost, {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2
                                    })
                                }}</b>
                            </template>
                            <template #plant_amount>
                                <b>{{ n(result.variables.plant_amount) }}</b>
                            </template>
                            <template #harvest_amount>
                                <b>{{ n(result.variables.harvest_amount) }}</b>
                            </template>
                            <template #required_space>
                                <b>{{ n(result.variables.required_space) }}</b>
                            </template>
                        </I18nTranslator>
                    </template>

                    <template #footer>
                        <Fieldset
                            :legend="
                                t(
                                    'calculators.vegetable_garden.messages.more_info_on_this_vegetable'
                                )
                            "
                        >
                            <div class="flex flex-col gap-4">
                                <div class="flex flex-col lg:flex-row gap-1">
                                    <span class="font-bold">{{ t('category') }}:</span>
                                    <span>{{ result.vegetable.type }}</span>
                                </div>

                                <div class="flex flex-col lg:flex-row gap-1">
                                    <span class="font-bold"
                                        >{{
                                            t(
                                                'calculators.vegetable_garden.messages.space_required_between_plants'
                                            )
                                        }}:</span
                                    >
                                    <span>{{ result.vegetable.space_required_cm2 }} cm²</span>
                                </div>

                                <div class="flex flex-col lg:flex-row gap-1">
                                    <span class="font-bold"
                                        >{{
                                            t('calculators.vegetable_garden.messages.irrigation')
                                        }}:</span
                                    >
                                    <I18nTranslator
                                        keypath="calculators.vegetable_garden.messages.irrigation_message"
                                        tag="span"
                                    >
                                        <template #frequency_amount>{{
                                            result.vegetable.irrigation.frequency.amount
                                        }}</template>
                                        <template #frequency_time_period>{{
                                            result.vegetable.irrigation.frequency.time_period
                                        }}</template>
                                        <template #quantity>{{
                                            result.vegetable.irrigation.quantity_liters
                                        }}</template>
                                    </I18nTranslator>
                                </div>

                                <div class="flex flex-col lg:flex-row gap-1">
                                    <span class="font-bold"
                                        >{{
                                            t(
                                                'calculators.vegetable_garden.messages.suitable_fertilizers'
                                            )
                                        }}:</span
                                    >
                                    <span>{{
                                        result.vegetable.suitable_fertilizers.join(', ')
                                    }}</span>
                                </div>

                                <div class="flex flex-col lg:flex-row gap-1">
                                    <span class="font-bold"
                                        >{{
                                            t(
                                                'calculators.vegetable_garden.messages.suitable_soils'
                                            )
                                        }}:</span
                                    >
                                    <span>{{ result.vegetable.suitable_soils.join(', ') }}</span>
                                </div>

                                <div class="flex flex-col lg:flex-row gap-1">
                                    <span class="font-bold"
                                        >{{
                                            t(
                                                'calculators.vegetable_garden.messages.suitable_seasons'
                                            )
                                        }}:</span
                                    >
                                    <span>{{ result.vegetable.suitable_seasons.join(', ') }}</span>
                                </div>

                                <div class="flex flex-col">
                                    <span class="font-bold"
                                        >{{
                                            t(
                                                'calculators.vegetable_garden.messages.growing_tips_lbl'
                                            )
                                        }}:</span
                                    >
                                    <div class="ml-2 pl-2 border-l-2 border-primary">
                                        <p
                                            v-for="tip in result.vegetable.growing_tips"
                                            :key="tip.replace(/\s/g, '').substring(0, 15)"
                                        >
                                            {{ tip }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex flex-col">
                                    <span class="font-bold"
                                        >{{
                                            t(
                                                'calculators.vegetable_garden.messages.common_diseases'
                                            )
                                        }}:</span
                                    >

                                    <div
                                        class="flex flex-col gap-2 ml-2 pl-2 border-l-2 border-primary"
                                    >
                                        <div class="flex flex-col lg:flex-row gap-1">
                                            <span class="font-bold"
                                                >{{
                                                    t(
                                                        'calculators.vegetable_garden.messages.diseases_signs_and_symptoms_lbl'
                                                    )
                                                }}:</span
                                            >
                                            <span>{{
                                                result.vegetable.diseases.signs_and_symptoms.join(
                                                    ', '
                                                )
                                            }}</span>
                                        </div>

                                        <div class="flex flex-col">
                                            <span class="font-bold"
                                                >{{
                                                    t(
                                                        'calculators.vegetable_garden.messages.diseases_preventions_lbl'
                                                    )
                                                }}:</span
                                            >
                                            <div class="ml-2 pl-2 border-l-2 border-primary">
                                                <p
                                                    v-for="prevention in result.vegetable.diseases
                                                        .prevention"
                                                    :key="
                                                        prevention
                                                            .replace(/\s/g, '')
                                                            .substring(0, 15)
                                                    "
                                                >
                                                    {{ prevention }}
                                                </p>
                                            </div>
                                        </div>

                                        <div class="flex flex-col">
                                            <span class="font-bold"
                                                >{{
                                                    t(
                                                        'calculators.vegetable_garden.messages.diseases_treatments_lbl'
                                                    )
                                                }}:</span
                                            >
                                            <div class="ml-2 pl-2 border-l-2 border-primary">
                                                <p
                                                    v-for="treatment in result.vegetable.diseases
                                                        .treatment"
                                                    :key="
                                                        treatment
                                                            .replace(/\s/g, '')
                                                            .substring(0, 15)
                                                    "
                                                >
                                                    {{ treatment }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fieldset>
                    </template>
                </Card>
            </div>
            <span v-else>{{ t('calculators.shared_messages.insert_data_to_calculate') }}</span>
        </div>
    </CalculatorPageWrapper>
</template>
