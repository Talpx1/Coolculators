<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CalculatorPageWrapper from '@/components/functional/CalculatorPageWrapper.vue'
import RadioInput from '@/components/ui/inputs/RadioInput.vue'
import NumberInput from '@/components/ui/inputs/NumberInput.vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import TextualLink from '@/components/ui/TextualLink.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'

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
    labelClass: 'text-center text-2xl mb-2'
}

const breakpoints = useBreakpoints(breakpointsTailwind)
const radioBntsOrientation = computed(() =>
    breakpoints.isSmallerOrEqual('md') ? 'vertical' : 'horizontal'
)

function nFormula(number: number) {
    return n(number, { maximumFractionDigits: 5 })
}
</script>

<template>
    <CalculatorPageWrapper id="daily_calorie_needs" application-category="HealthApplication">
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
                    :groupLabel="t('calculators.daily_calorie_needs.messages.physical_activity')"
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
                            label: t('calculators.daily_calorie_needs.messages.active_lifestyle'),
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
                        n(dailyCalorieNeeds, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
                    }}
                    kcal
                </div>
            </div>
            <div v-else>
                {{ t('calculators.shared_messages.insert_data_to_calculate') }}
            </div>
        </div>

        <div class="flex flex-col justify-self-center">
            <SecondaryHeading>{{ t('calculators.shared_messages.formula') }}</SecondaryHeading>
            <div class="space-y-8">
                <div class="flex gap-1 text-sm">
                    {{ t('calculators.shared_messages.source') }}:
                    <TextualLink
                        target="_blank"
                        to="https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation"
                    >
                        <h3>
                            {{
                                t(
                                    'calculators.daily_calorie_needs.messages.harris-benedict_formula'
                                )
                            }}
                        </h3>
                    </TextualLink>
                </div>

                <div class="space-y-2">
                    <h3 class="font-bold">
                        {{ t('calculators.daily_calorie_needs.messages.bmr') }} (BRM)<sub>kcal</sub>
                    </h3>

                    <h4>
                        {{ t('calculators.shared_messages.male') }}: {{ nFormula(66.473) }} + ({{
                            nFormula(13.7516)
                        }}
                        × {{ t('calculators.shared_messages.weight').toLowerCase() }}<sub>kg</sub>)
                        + ({{ nFormula(5.0033) }} × ({{
                            t('calculators.shared_messages.height').toLowerCase()
                        }}<sub>m</sub> × 100)) - ({{ nFormula(6.755) }} ×
                        {{ t('calculators.shared_messages.age').toLowerCase() }})
                    </h4>
                    <h4>
                        {{ t('calculators.shared_messages.female') }}: {{ nFormula(655.0955) }} +
                        ({{ nFormula(9.5634) }} ×
                        {{ t('calculators.shared_messages.weight').toLowerCase() }}<sub>kg</sub>) +
                        ({{ nFormula(1.8496) }} × ({{
                            t('calculators.shared_messages.height').toLowerCase()
                        }}<sub>m</sub> × 100)) - ({{ nFormula(4.6756) }} ×
                        {{ t('calculators.shared_messages.age').toLowerCase() }})
                    </h4>
                </div>

                <div class="space-y-2">
                    <h3 class="font-bold">
                        {{ t('calculators.daily_calorie_needs.messages.daily_calorie_needs')
                        }}<sub>kcal</sub>
                    </h3>

                    <h4>
                        BRM ×
                        {{
                            t(
                                'calculators.daily_calorie_needs.messages.physical_activity_coefficient'
                            ).toLowerCase()
                        }}
                    </h4>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-16 justify-self-center max-w-full">
            <div class="flex flex-col">
                <SecondaryHeading>{{
                    t('calculators.daily_calorie_needs.messages.what_daily_calorie_needs_is')
                }}</SecondaryHeading>
                <TextParagraph>
                    {{
                        t(
                            'calculators.daily_calorie_needs.messages.what_daily_calorie_needs_is_description'
                        )
                    }}
                </TextParagraph>
            </div>

            <div class="flex flex-col">
                <SecondaryHeading>{{
                    t('calculators.daily_calorie_needs.messages.what_bmr_is')
                }}</SecondaryHeading>
                <TextParagraph>
                    {{ t('calculators.daily_calorie_needs.messages.what_bmr_is_description') }}
                </TextParagraph>
            </div>

            <div class="flex flex-col">
                <SecondaryHeading>{{
                    t(
                        'calculators.daily_calorie_needs.messages.purpose_of_knowing_your_daily_calorie_needs'
                    )
                }}</SecondaryHeading>
                <TextParagraph>
                    {{
                        t(
                            'calculators.daily_calorie_needs.messages.purpose_of_knowing_your_daily_calorie_needs_description'
                        )
                    }}
                </TextParagraph>
            </div>

            <div class="flex flex-col">
                <SecondaryHeading>{{
                    t(
                        'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs'
                    )
                }}</SecondaryHeading>
                <TextParagraph>
                    {{
                        t(
                            'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.intro'
                        )
                    }}<br /><br />

                    <h3 class="font-bold">
                        {{
                            t(
                                'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.for_men'
                            )
                        }}
                    </h3>
                    <h4>
                        {{
                            t(
                                'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.men_formula'
                            )
                        }}
                    </h4>

                    <h3 class="font-bold">
                        {{
                            t(
                                'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.for_women'
                            )
                        }}
                    </h3>
                    <h4>
                        {{
                            t(
                                'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.women_formula'
                            )
                        }}
                    </h4>
                    <br />

                    {{
                        t(
                            'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.after_bmr_formula'
                        )
                    }}

                    <div class="flex gap-1">
                        <h3 class="font-bold">
                            {{ t('calculators.daily_calorie_needs.messages.sedentary_lifestyle') }}:
                        </h3>
                        <h4>
                            {{
                                t(
                                    'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.sedentary_daily_calorie_needs_formula'
                                )
                            }}
                        </h4>
                    </div>
                    <div class="flex gap-1">
                        <h3 class="font-bold">
                            {{
                                t(
                                    'calculators.daily_calorie_needs.messages.moderately_active_lifestyle'
                                )
                            }}:
                        </h3>
                        <h4>
                            {{
                                t(
                                    'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.moderately_active_daily_calorie_needs_formula'
                                )
                            }}
                        </h4>
                    </div>
                    <div class="flex gap-1">
                        <h3 class="font-bold">
                            {{ t('calculators.daily_calorie_needs.messages.active_lifestyle') }}:
                        </h3>
                        <h4>
                            {{
                                t(
                                    'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.active_daily_calorie_needs_formula'
                                )
                            }}
                        </h4>
                    </div>
                </TextParagraph>
            </div>

            <div class="flex flex-col">
                <SecondaryHeading>{{
                    t(
                        'calculators.daily_calorie_needs.messages.why_is_it_important_to_know_your_daily_calorie_needs'
                    )
                }}</SecondaryHeading>
                <TextParagraph>
                    {{
                        t(
                            'calculators.daily_calorie_needs.messages.why_is_it_important_to_know_your_daily_calorie_needs_description'
                        )
                    }}
                </TextParagraph>
            </div>
        </div>
    </CalculatorPageWrapper>
</template>
