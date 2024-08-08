<script setup lang="ts">
import NumberInput from '@/components/ui/inputs/NumberInput.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MeterGroup from 'primevue/metergroup'
import colors from 'tailwindcss/colors'
import { PrimeIcons } from '@primevue/core/api'

const { t } = useI18n()

const [MIN_BMI, MAX_BMI] = [13, 43]

const weight = ref(0)
const height = ref(0)

const bmi = computed(() => {
    if (!height.value || !weight.value) {
        return null
    }
    return weight.value / Math.pow(height.value, 2)
})

const btnClasses = '[&>span.pi]:w-full [&>span.pi]:h-full [&>span.pi]:align-middle'

type BmiRange = {
    min: number
    max: number
    label: string
    color: string
    value: number
}
const bmiRanges = computed((): BmiRange[] =>
    [
        {
            min: Number.NEGATIVE_INFINITY,
            max: 16,
            label: t('calculators.body_mass_index.messages.severe_thinness'),
            color: colors.red[700]
        },

        {
            min: 16,
            max: 17,
            label: t('calculators.body_mass_index.messages.moderate_thinness'),
            color: colors.red[500]
        },

        {
            min: 17,
            max: 18.5,
            label: t('calculators.body_mass_index.messages.mild_thinness'),
            color: colors.yellow[500]
        },

        {
            min: 18.5,
            max: 25,
            label: t('calculators.body_mass_index.messages.normal'),
            color: colors.green[500]
        },

        {
            min: 25,
            max: 30,
            label: t('calculators.body_mass_index.messages.overweight'),
            color: colors.yellow[500]
        },

        {
            min: 30,
            max: 35,
            label: t('calculators.body_mass_index.messages.obese_class_1'),
            color: colors.red[500]
        },

        {
            min: 35,
            max: 40,
            label: t('calculators.body_mass_index.messages.obese_class_2'),
            color: colors.red[700]
        },

        {
            min: 40,
            max: Number.POSITIVE_INFINITY,
            label: t('calculators.body_mass_index.messages.obese_class_3'),
            color: colors.red[800]
        }
    ].map((r) => ({ ...r, value: bmiRangeAsPercentage(r) }))
)

const bmiRange = computed((): BmiRange | null => {
    if (!bmi.value) {
        return null
    }

    return bmiRanges.value.find((range) => bmi.value! >= range.min && bmi.value! < range.max)!
})

type BmiMacroRange = {
    value: number
    min: number
    max: number
    label: string
    color: string
}
const bmiMacroRanges = computed((): BmiMacroRange[] =>
    [
        {
            min: Number.NEGATIVE_INFINITY,
            max: 18.5,
            label: t('calculators.body_mass_index.messages.underweight'),
            color: colors.red[500]
        },
        {
            min: 18.5,
            max: 25,
            label: t('calculators.body_mass_index.messages.normal'),
            color: colors.green[500]
        },
        {
            min: 25,
            max: 30,
            label: t('calculators.body_mass_index.messages.overweight'),
            color: colors.yellow[500]
        },
        {
            min: 30,
            max: Number.POSITIVE_INFINITY,
            label: t('calculators.body_mass_index.messages.obese'),
            color: colors.red[500]
        }
    ].map((r) => ({ ...r, value: bmiRangeAsPercentage(r) }))
)

const bmiAsPercentage = computed(() => {
    if (!bmi.value) {
        return null
    }
    if (bmi.value < MIN_BMI) {
        return 0
    }

    if (bmi.value > MAX_BMI) {
        return 100
    }

    const percentage = ((bmi.value - MIN_BMI) * 100) / (MAX_BMI - MIN_BMI)

    return percentage
})

function bmiRangeAsPercentage(range: Pick<BmiRange, 'max' | 'min'>) {
    const min = isFinite(range.min) ? range.min : MIN_BMI
    const max = isFinite(range.max) ? range.max : MAX_BMI

    return ((max - min) * 100) / (MAX_BMI - MIN_BMI)
}
</script>

<template>
    <div class="grid grid-cols-1 place-content-center gap-16 h-full">
        <div class="flex gap-16 justify-center">
            <NumberInput
                input-class="py-8"
                class="!w-48 text-4xl"
                :label="t('calculators.body_mass_index.messages.weight')"
                v-model="weight"
                suffix=" kg"
                label-class="text-center text-2xl mb-2"
                :increment-button-class="btnClasses"
                :decrement-button-class="btnClasses"
            />
            <NumberInput
                input-class="py-8"
                class="!w-48 text-4xl"
                :label="t('calculators.body_mass_index.messages.height')"
                v-model="height"
                suffix=" m"
                :step="0.01"
                :max-fraction-digits="2"
                :min-fraction-digits="2"
                label-class="text-center text-2xl mb-2"
                :increment-button-class="btnClasses"
                :decrement-button-class="btnClasses"
            />
        </div>

        <div class="flex justify-center text-center">
            <div v-if="bmi && bmiRange" class="text-4xl space-y-4">
                <div>
                    {{ t('calculators.body_mass_index.messages.bmi') }}:
                    <span :style="{ color: bmiRange.color }"
                        >{{ bmi.toFixed(1) }} kg/m<sup>2</sup></span
                    >
                </div>
                <div :style="{ color: bmiRange.color }">{{ bmiRange.label }}</div>
            </div>
            <div v-else>{{ t('insert_data_to_calculate') }}</div>
        </div>

        <MeterGroup :value="bmiRanges">
            <template #start>
                <div
                    v-if="bmiAsPercentage !== null && bmi !== null"
                    class="relative w-full h-[30px]"
                    :style="{ color: bmiRange?.color }"
                >
                    <div
                        class="text-center absolute top-0 -translate-x-1/2"
                        :style="{ left: `${bmiAsPercentage}%` }"
                    >
                        {{ bmi.toFixed(1) }}<br />
                        <i :class="PrimeIcons.ANGLE_DOWN"></i>
                    </div>
                </div>
            </template>

            <template #label>
                <div class="flex">
                    <div
                        v-for="range in bmiMacroRanges"
                        :key="range.label"
                        class="text-center"
                        :style="{
                            width: `${range.value}%`,
                            color: range.color
                        }"
                    >
                        {{ range.label }} <br />
                        {{
                            [
                                isFinite(range.min) && `>=${range.min}`,
                                isFinite(range.max) && `<${range.max}`
                            ]
                                .filter((x) => x !== false)
                                .join('&nbsp;&nbsp;-&nbsp;&nbsp;')
                        }}
                    </div>
                </div>
            </template>
        </MeterGroup>
    </div>
</template>
