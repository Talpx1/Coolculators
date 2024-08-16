<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TextualLink from '@/components/ui/TextualLink.vue'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'

const { t, n } = useI18n()

function nFormula(number: number) {
    return n(number, { maximumFractionDigits: 5 })
}
</script>

<template>
    <SecondaryHeading>{{ t('calculators.shared_messages.formula') }}</SecondaryHeading>
    <div class="space-y-8">
        <div class="flex gap-1 text-sm">
            {{ t('calculators.shared_messages.source') }}:
            <TextualLink
                target="_blank"
                to="https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation"
            >
                <h3>
                    {{ t('calculators.daily_calorie_needs.messages.harris-benedict_formula') }}
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
                × {{ t('calculators.shared_messages.weight').toLowerCase() }}<sub>kg</sub>) + ({{
                    nFormula(5.0033)
                }}
                × ({{ t('calculators.shared_messages.height').toLowerCase() }}<sub>m</sub> × 100)) -
                ({{ nFormula(6.755) }} × {{ t('calculators.shared_messages.age').toLowerCase() }})
            </h4>
            <h4>
                {{ t('calculators.shared_messages.female') }}: {{ nFormula(655.0955) }} + ({{
                    nFormula(9.5634)
                }}
                × {{ t('calculators.shared_messages.weight').toLowerCase() }}<sub>kg</sub>) + ({{
                    nFormula(1.8496)
                }}
                × ({{ t('calculators.shared_messages.height').toLowerCase() }}<sub>m</sub> × 100)) -
                ({{ nFormula(4.6756) }} × {{ t('calculators.shared_messages.age').toLowerCase() }})
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
</template>
