<script setup lang="ts">
import NumberInput from '@/components/ui/inputs/NumberInput.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CalculatorPageWrapper from '@/components/ui/CalculatorPageWrapper.vue'
import useBmi from './composables/useBmi'
import BmiBar from './components/BmiBar.vue'
import BmiFormula from './components/BmiFormula.vue'
import BmiRangesTable from './components/BmiRangesTable.vue'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'

const { t, n } = useI18n()

const weight = ref(0)
const height = ref(0)

const { bmi, range: bmiRange } = useBmi(height, weight)

const numberInputProps = {
    inputClass: 'py-8',
    class: '!w-32 lg:!w-48 text-2xl lg:text-4xl',
    incrementButtonClass: '[&>span.pi]:w-full [&>span.pi]:h-full [&>span.pi]:align-middle',
    decrementButtonClass: '[&>span.pi]:w-full [&>span.pi]:h-full [&>span.pi]:align-middle',
    labelClass: 'text-center text-2xl mb-2'
}
</script>

<template>
    <CalculatorPageWrapper id="body_mass_index">
        <div class="flex gap-16 justify-center">
            <NumberInput
                v-bind="numberInputProps"
                :label="t('calculators.body_mass_index.messages.weight')"
                v-model="weight"
                suffix=" kg"
            />
            <NumberInput
                v-bind="numberInputProps"
                :label="t('calculators.body_mass_index.messages.height')"
                v-model="height"
                suffix=" m"
                :step="0.01"
                :max-fraction-digits="2"
                :min-fraction-digits="2"
            />
        </div>

        <div class="flex justify-center text-center">
            <div v-if="bmi && bmiRange" class="text-2xl lg:text-4xl space-y-4">
                <div>
                    {{ t('calculators.body_mass_index.messages.bmi') }}:
                    <span :style="{ color: bmiRange.color }"
                        >{{ n(bmi, { maximumFractionDigits: 1 }) }} kg/m<sup>2</sup></span
                    >
                </div>
                <div :style="{ color: bmiRange.color }">{{ bmiRange.label }}</div>
            </div>
            <div v-else>{{ t('insert_data_to_calculate') }}</div>
        </div>

        <BmiBar :bmi :bmi-range />

        <div class="flex flex-col gap-16 lg:flex-row justify-evenly items-center">
            <BmiFormula />

            <BmiRangesTable />
        </div>

        <div
            class="flex flex-col lg:flex-row gap-y-16 justify-around justify-self-center lg:justify-self-auto"
        >
            <div>
                <SecondaryHeading>
                    {{ t('calculators.body_mass_index.messages.what_bmi_is') }}
                </SecondaryHeading>
                <TextParagraph>
                    {{ t('calculators.body_mass_index.messages.what_bmi_is_description') }}
                </TextParagraph>
            </div>

            <div>
                <SecondaryHeading>
                    {{ t('calculators.body_mass_index.messages.low_or_high_bmi_risks') }}
                </SecondaryHeading>
                <TextParagraph>{{
                    t('calculators.body_mass_index.messages.low_or_high_bmi_risks_description')
                }}</TextParagraph>
            </div>
        </div>
    </CalculatorPageWrapper>
</template>
