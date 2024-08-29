<script setup lang="ts">
import CalculatorPageWrapper from '@/components/functional/CalculatorPageWrapper.vue'
import useVegetables, { type Vegetable } from './composables/useVegetables'
import { useI18n } from 'vue-i18n'
import I18nTranslator from '@/components/i18n/I18nTranslator.vue'
import { computed, ref } from 'vue'
import MultiSelectInput from '@/components/ui/inputs/MultiSelectInput.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import RadioInput from '@/components/ui/inputs/RadioInput.vue'
import NumberInput from '@/components/ui/inputs/NumberInput.vue'
import Button from 'primevue/button'
import Message from 'primevue/message'
import useVegetableGardenCalculation from './composables/useVegetableGardenCalculation'
import Card from 'primevue/card'
import Fieldset from 'primevue/fieldset'
import useClimates, { type Climate } from './composables/useClimates'
import SelectInput from '@/components/ui/inputs/SelectInput.vue'
import type { MultiSelectChangeEvent } from 'primevue/multiselect'
import TranslatableParagraphBlock from '@/components/i18n/TranslatableParagraphBlock.vue'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'
import TextualLink from '@/components/ui/TextualLink.vue'

type CalculationType = 'byAvailableSpace' | 'byHarvestAmount'

const { t, n } = useI18n()

const vegetables = useVegetables()

const selectedClimate = ref<Climate>()
const climates = useClimates()

const selectedVegetables = ref<Vegetable[]>([])

export type VegetableGardenUserInput = {
    id: string
    calculation_type: CalculationType
    available_space: number
    desired_harvest: number
}
const userInput = ref<VegetableGardenUserInput[]>([])

const { results, calculate, errors, invalid } = useVegetableGardenCalculation(
    selectedClimate,
    selectedVegetables,
    userInput
)

const breakpoints = useBreakpoints(breakpointsTailwind)
const radioBntsOrientation = computed(() =>
    breakpoints.isSmallerOrEqual('md') ? 'vertical' : 'horizontal'
)

function onVegetableSelection(e: MultiSelectChangeEvent) {
    if (!e.value.length) {
        userInput.value = []
        return
    }

    userInput.value.filter((i) => e.value.map((v: Vegetable) => v.id).includes(i.id))

    e.value.forEach((selected: Vegetable) => {
        if (userInput.value.map((i) => i.id).includes(selected.id)) {
            return
        }

        userInput.value.push({
            id: selected.id,
            calculation_type: 'byAvailableSpace',
            available_space: selected.space_required_m2,
            desired_harvest: selected.yield_kg_per_plant
        })
    })
}

const reactiveVegetableData = computed(() => {
    const obj: Record<string, Vegetable> = {}
    results.value.forEach(
        (v) => (obj[v.vegetableId] = vegetables.value.find((v2) => v2.id === v.vegetableId)!)
    )
    return obj
})
</script>

<template>
    <CalculatorPageWrapper id="vegetable_garden" application-category="HomeApplication">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <I18nTranslator
                keypath="calculators.vegetable_garden.messages.intro"
                tag="h3"
                class="text-center lg:col-span-2"
            />

            <SelectInput
                :invalid="invalid.climate"
                :options="climates"
                option-label="name"
                :label="t('calculators.vegetable_garden.messages.climate')"
                :placeholder="t('calculators.vegetable_garden.messages.select_a_climate')"
                filter
                v-model:selected="selectedClimate"
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
                @change="onVegetableSelection"
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
                        v-model="userInput.find((v) => v.id === vegetable.id)!.calculation_type"
                        :groupLabel="
                            t(
                                'calculators.vegetable_garden.messages.what_to_base_the_calculation_on'
                            )
                        "
                        :entries="[
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
                        v-if="
                            userInput.find((v) => v.id === vegetable.id)!.calculation_type ===
                            'byAvailableSpace'
                        "
                        suffix=" m²"
                        input-class="max-w-24"
                        :label="t(`calculators.vegetable_garden.messages.available_space`)"
                        :min="vegetable.space_required_m2"
                        v-model="userInput.find((v) => v.id === vegetable.id)!.available_space"
                        button-layout="horizontal"
                    />
                    <NumberInput
                        v-else
                        suffix=" kg"
                        :step="0.1"
                        :max-fraction-digits="1"
                        input-class="max-w-24"
                        :label="t(`calculators.vegetable_garden.messages.desired_harvest`)"
                        :min="vegetable.yield_kg_per_plant"
                        v-model="userInput.find((v) => v.id === vegetable.id)!.desired_harvest"
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
                <Card v-for="result in results" :key="result.vegetableId" class="flex flex-col">
                    <template #title
                        ><span class="font-bold text-xl">{{
                            reactiveVegetableData[result.vegetableId].name
                        }}</span></template
                    >

                    <template #content>
                        <I18nTranslator :keypath="result.text" tag="span">
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
                                    <span>{{
                                        reactiveVegetableData[result.vegetableId].type
                                    }}</span>
                                </div>

                                <div class="flex flex-col lg:flex-row gap-1">
                                    <span class="font-bold"
                                        >{{
                                            t(
                                                'calculators.vegetable_garden.messages.space_required_between_plants'
                                            )
                                        }}:</span
                                    >
                                    <span
                                        >{{
                                            reactiveVegetableData[result.vegetableId]
                                                .space_required_m2
                                        }}
                                        m²</span
                                    >
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
                                            reactiveVegetableData[result.vegetableId].irrigation
                                                .frequency.amount
                                        }}</template>
                                        <template #frequency_time_period>{{
                                            reactiveVegetableData[result.vegetableId].irrigation
                                                .frequency.time_period
                                        }}</template>
                                        <template #quantity>{{
                                            reactiveVegetableData[result.vegetableId].irrigation
                                                .quantity_liters
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
                                        reactiveVegetableData[
                                            result.vegetableId
                                        ].suitable_fertilizers.join(', ')
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
                                    <span>{{
                                        reactiveVegetableData[
                                            result.vegetableId
                                        ].suitable_soils.join(', ')
                                    }}</span>
                                </div>

                                <div class="flex flex-col lg:flex-row gap-1">
                                    <span class="font-bold"
                                        >{{
                                            t(
                                                'calculators.vegetable_garden.messages.suitable_seasons'
                                            )
                                        }}:</span
                                    >
                                    <span>{{
                                        reactiveVegetableData[
                                            result.vegetableId
                                        ].suitable_seasons.join(', ')
                                    }}</span>
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
                                            v-for="tip in reactiveVegetableData[result.vegetableId]
                                                .growing_tips"
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
                                                reactiveVegetableData[
                                                    result.vegetableId
                                                ].diseases.signs_and_symptoms.join(', ')
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
                                                    v-for="prevention in reactiveVegetableData[
                                                        result.vegetableId
                                                    ].diseases.prevention"
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
                                                    v-for="treatment in reactiveVegetableData[
                                                        result.vegetableId
                                                    ].diseases.treatment"
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

        <div class="flex flex-col gap-16 justify-self-center max-w-full">
            <TranslatableParagraphBlock
                titleKeypath="calculators.vegetable_garden.messages.what_is_the_vegetable_sowing_calculator_for"
            />

            <TranslatableParagraphBlock
                titleKeypath="calculators.vegetable_garden.messages.what_information_will_the_sowing_calculator_provide_me"
            />

            <TranslatableParagraphBlock
                titleKeypath="calculators.vegetable_garden.messages.why_is_climate_an_important_element_in_sowing_calculations"
            />

            <div>
                <SecondaryHeading>
                    <I18nTranslator
                        keypath="calculators.vegetable_garden.messages.what_else_might_be_useful_to_know_for_growing_my_vegetable_garden"
                    />
                </SecondaryHeading>

                <TextParagraph>
                    <I18nTranslator
                        keypath="calculators.vegetable_garden.messages.what_else_might_be_useful_to_know_for_growing_my_vegetable_garden_description.part_1"
                    >
                        <template #part_1_links>
                            <ul class="list-disc list-inside space-y-2 lg:space-y-0">
                                <li>
                                    <TextualLink
                                        to="https://www.viridea.it/consigli/orto-in-balcone-e-in-giardino-semine-e-trapianti-seguendo-la-luna/"
                                    >
                                        (ITA)
                                        https://www.viridea.it/consigli/orto-in-balcone-e-in-giardino-semine-e-trapianti-seguendo-la-luna/
                                    </TextualLink>
                                </li>
                                <li>
                                    <TextualLink
                                        to="https://www.ortoggi.it/le_fasi_lunari_orto.php"
                                    >
                                        (ITA) https://www.ortoggi.it/le_fasi_lunari_orto.php
                                    </TextualLink>
                                </li>
                                <li>
                                    <TextualLink
                                        to="https://www.haxnicks.co.uk/blogs/grow-at-home/lunar-gardening"
                                    >
                                        (ENG)
                                        https://www.haxnicks.co.uk/blogs/grow-at-home/lunar-gardening
                                    </TextualLink>
                                </li>
                                <li>
                                    <TextualLink
                                        to="https://www.almanac.com/content/planting-by-the-moon"
                                    >
                                        (ENG) https://www.almanac.com/content/planting-by-the-moon
                                    </TextualLink>
                                </li>
                            </ul>
                        </template>
                    </I18nTranslator>

                    <I18nTranslator
                        keypath="calculators.vegetable_garden.messages.what_else_might_be_useful_to_know_for_growing_my_vegetable_garden_description.part_2"
                    >
                        <template #part_2_links>
                            <ul class="list-disc list-inside space-y-2 lg:space-y-0">
                                <li>
                                    <TextualLink to="https://www.ortoggi.it/la_consociazione.html">
                                        (ITA) https://www.ortoggi.it/la_consociazione.html
                                    </TextualLink>
                                </li>
                                <li>
                                    <TextualLink
                                        to="https://www.compo-hobby.it/manuale/cura-delle-piante/curare-orto/consociazioni-orto#al-02-perch-alcune-verdure-non-vanno-d-accordo-"
                                    >
                                        (ITA)
                                        https://www.compo-hobby.it/manuale/cura-delle-piante/curare-orto/consociazioni-orto#al-02-perch-alcune-verdure-non-vanno-d-accordo-
                                    </TextualLink>
                                </li>
                                <li>
                                    <TextualLink
                                        to="https://greenlifesoil.com.au/sustainable-gardening-tips/companion-planting"
                                    >
                                        (ENG)
                                        https://greenlifesoil.com.au/sustainable-gardening-tips/companion-planting
                                    </TextualLink>
                                </li>
                                <li>
                                    <TextualLink
                                        to="https://www.almanac.com/companion-planting-guide-vegetables"
                                    >
                                        (ENG)
                                        https://www.almanac.com/companion-planting-guide-vegetables
                                    </TextualLink>
                                </li>
                            </ul>
                        </template>
                    </I18nTranslator>
                </TextParagraph>
            </div>
        </div>
    </CalculatorPageWrapper>
</template>
