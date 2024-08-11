<script setup lang="ts">
import { computed } from 'vue'
import useMacroBmiRanges from '../composables/useMacroBmiRanges'
import MeterGroup from 'primevue/metergroup'
import useBmiRanges, { type BmiRange, MAX_BMI, MIN_BMI } from '../composables/useBmiRanges'
import { PrimeIcons } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'

const { n } = useI18n()

const props = defineProps<{ bmi: number | null; bmiRange: BmiRange | null }>()

const bmiMacroRanges = useMacroBmiRanges()

const bmiRanges = useBmiRanges()

const bmiAsPercentage = computed(() => {
    if (!props.bmi) {
        return null
    }
    if (props.bmi < MIN_BMI) {
        return 0
    }

    if (props.bmi > MAX_BMI) {
        return 100
    }

    const percentage = ((props.bmi - MIN_BMI) * 100) / (MAX_BMI - MIN_BMI)

    return percentage
})
</script>

<template>
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
                    {{ n(bmi, { maximumFractionDigits: 1 }) }}<br />
                    <i :class="PrimeIcons.ANGLE_DOWN"></i>
                </div>
            </div>
        </template>

        <template #label>
            <div class="hidden lg:flex">
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
                            isFinite(range.min) &&
                                `>=${n(range.min, { maximumFractionDigits: 1 })}`,
                            isFinite(range.max) && `<${n(range.max, { maximumFractionDigits: 1 })}`
                        ]
                            .filter((x) => x !== false)
                            .join('&nbsp;&nbsp;-&nbsp;&nbsp;')
                    }}
                </div>
            </div>
        </template>
    </MeterGroup>
</template>
