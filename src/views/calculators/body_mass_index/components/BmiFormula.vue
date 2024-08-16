<script setup lang="ts">
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <div>
        <SecondaryHeading>{{ t('calculators.shared_messages.formula') }}</SecondaryHeading>
        <div class="flex items-center gap-2">
            <p>
                {{ t('calculators.body_mass_index.messages.bmi') }}<sub>kg/m<sup>2</sup></sub>
            </p>
            <p>=</p>
            <div class="divide-y text-center [&>p]:py-1">
                <p class="border-b border-primary-950">
                    {{ t('calculators.shared_messages.weight').toLowerCase() }}<sub>kg</sub>
                </p>
                <p>
                    ({{ t('calculators.shared_messages.height').toLowerCase() }}<sub>m</sub>)<sup
                        >2</sup
                    >
                </p>
            </div>
        </div>
    </div>
</template>
