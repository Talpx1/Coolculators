<script setup lang="ts">
import NumberInput from '@/components/ui/inputs/NumberInput.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CalculatorPageWrapper from '@/components/functional/CalculatorPageWrapper.vue'
import useBmi from './composables/useBmi'
import BmiBar from './components/BmiBar.vue'
import BmiFormula from './components/BmiFormula.vue'
import BmiRangesTable from './components/BmiRangesTable.vue'
import RelatedResources from '@/components/ui/RelatedResources.vue'
import BmiParagraphs from './components/BmiParagraphs.vue'

const { t, n } = useI18n()

const weight = ref()
const height = ref()

const { bmi, range: bmiRange } = useBmi(height, weight)

const numberInputProps = {
    inputClass: 'py-8',
    class: '!w-32 lg:!w-48 text-2xl lg:text-4xl',
    incrementButtonClass: '[&>span.pi]:w-full [&>span.pi]:h-full [&>span.pi]:align-middle',
    decrementButtonClass: '[&>span.pi]:w-full [&>span.pi]:h-full [&>span.pi]:align-middle',
    labelClass: 'text-center text-xl lg:text-2xl mb-2'
}
</script>

<template>
    <CalculatorPageWrapper id="body_mass_index" application-category="HealthApplication">
        <div class="flex gap-16">
            <NumberInput
                v-bind="numberInputProps"
                :label="t('calculators.shared_messages.weight')"
                v-model="weight"
                suffix=" kg"
            />
            <NumberInput
                v-bind="numberInputProps"
                :label="t('calculators.shared_messages.height')"
                v-model="height"
                suffix=" m"
                :step="0.01"
                :max-fraction-digits="2"
                :min-fraction-digits="2"
            />
        </div>

        <div class="flex">
            <div v-if="bmi && bmiRange" class="text-2xl lg:text-4xl space-y-4">
                <div>
                    {{ t('calculators.body_mass_index.messages.bmi') }}:
                    <span :style="{ color: bmiRange.color }"
                        >{{ n(bmi, { maximumFractionDigits: 1 }) }} kg/m<sup>2</sup></span
                    >
                </div>
                <div :style="{ color: bmiRange.color }">{{ bmiRange.label }}</div>
            </div>
            <div v-else>{{ t('calculators.shared_messages.insert_data_to_calculate') }}</div>
        </div>

        <BmiBar :bmi :bmi-range />

        <BmiFormula />

        <BmiRangesTable />

        <div class="flex flex-col gap-16 justify-self-center max-w-full">
            <BmiParagraphs />
        </div>

        <RelatedResources
            :resources="[
                'https://www.betterhealth.vic.gov.au/health/healthyliving/body-mass-index-bmi',
                'https://www.cdc.gov/bmi/faq/',
                'https://emedicine.medscape.com/article/123702-overview#showall?form=fpf'
            ]"
        />
    </CalculatorPageWrapper>
</template>
