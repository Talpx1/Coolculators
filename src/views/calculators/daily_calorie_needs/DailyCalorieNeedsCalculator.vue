<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CalculatorPageWrapper from '@/components/functional/CalculatorPageWrapper.vue'
import RadioInput from '@/components/ui/inputs/RadioInput.vue'
import NumberInput from '@/components/ui/inputs/NumberInput.vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

import DailyCalorieNeedsFormula from './components/DailyCalorieNeedsFormula.vue'
import DailyCalorieNeedsParagraphs from './components/DailyCalorieNeedsParagraphs.vue'

const { t, n } = useI18n()

const gender = ref<'male' | 'female'>()
const weight = ref()
const height = ref()
const age = ref()
const lifestyleCoefficient = ref()

const bmr = computed(() => {
    if (!gender.value || !weight.value || !height.value || !age.value) {
        return null
    }

    if (gender.value === 'male') {
        return 66.473 + 13.7516 * weight.value + 5.0033 * (height.value * 100) - 6.755 * age.value
    }

    return 655.0955 + 9.5634 * weight.value + 1.8496 * (height.value * 100) - 4.6756 * age.value
})

const dailyCalorieNeeds = computed(() => {
    if (!bmr.value || !lifestyleCoefficient.value) {
        return null
    }

    return bmr.value * lifestyleCoefficient.value
})

const numberInputProps = {
    inputClass: 'py-8',
    class: '!w-24 lg:!w-48 text-xl lg:text-4xl',
    incrementButtonClass: '[&>span.pi]:w-full [&>span.pi]:h-full [&>span.pi]:align-middle',
    decrementButtonClass: '[&>span.pi]:w-full [&>span.pi]:h-full [&>span.pi]:align-middle',
    labelClass: 'text-center text-md lg:text-2xl mb-2'
}

const breakpoints = useBreakpoints(breakpointsTailwind)
const radioBntsOrientation = computed(() =>
    breakpoints.isSmallerOrEqual('md') ? 'vertical' : 'horizontal'
)
</script>

<template>
    <CalculatorPageWrapper id="daily_calorie_needs" application-category="HealthApplication">
        <template #calculator>
            <div class="flex flex-col gap-8 justify-self-center">
                <div class="flex gap-2 lg:gap-8">
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
                    <NumberInput
                        v-bind="numberInputProps"
                        :label="t('calculators.shared_messages.age')"
                        v-model="age"
                    />
                </div>
                <div class="mt-8 flex flex-col gap-8">
                    <RadioInput
                        :orientation="radioBntsOrientation"
                        class="text-xl lg:text-2xl"
                        v-model="gender"
                        :groupLabel="t('calculators.shared_messages.gender')"
                        :entries="[
                            { label: t('calculators.shared_messages.male'), value: 'male' },
                            { label: t('calculators.shared_messages.female'), value: 'female' }
                        ]"
                    />
                    <RadioInput
                        :orientation="radioBntsOrientation"
                        class="text-xl lg:text-2xl"
                        v-model="lifestyleCoefficient"
                        :groupLabel="
                            t('calculators.daily_calorie_needs.messages.physical_activity')
                        "
                        :entries="[
                            {
                                label: t(
                                    'calculators.daily_calorie_needs.messages.sedentary_lifestyle'
                                ),
                                value: 1.2
                            },
                            {
                                label: t(
                                    'calculators.daily_calorie_needs.messages.moderately_active_lifestyle'
                                ),
                                value: 1.3
                            },
                            {
                                label: t(
                                    'calculators.daily_calorie_needs.messages.active_lifestyle'
                                ),
                                value: 1.4
                            }
                        ]"
                    />
                </div>
            </div>

            <div class="flex flex-col justify-self-center">
                <div v-if="dailyCalorieNeeds && bmr" class="space-y-4 text-xl lg:text-4xl">
                    <div>
                        {{ t('calculators.daily_calorie_needs.messages.bmr') }}:
                        {{ n(bmr, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) }} kcal
                    </div>
                    <div>
                        {{ t('calculators.daily_calorie_needs.messages.daily_calorie_needs') }}:
                        {{
                            n(dailyCalorieNeeds, {
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2
                            })
                        }}
                        kcal
                    </div>
                </div>
                <div v-else>
                    {{ t('calculators.shared_messages.insert_data_to_calculate') }}
                </div>
            </div>

            <div class="flex flex-col justify-self-center">
                <DailyCalorieNeedsFormula />
            </div>
        </template>

        <template #blog>
            <DailyCalorieNeedsParagraphs />
        </template>
    </CalculatorPageWrapper>
</template>
