<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <div>
        <h2 class="text-xl font-bold mb-2">Formula</h2>
        <div class="flex items-center gap-2">
            <p>{{ t('calculators.body_mass_index.messages.bmi') }} (kg/m<sup>2</sup>)</p>
            <p>=</p>
            <div class="divide-y text-center [&>p]:py-1">
                <p class="border-b border-primary-950">
                    {{ t('calculators.body_mass_index.messages.weight').toLowerCase() }}
                    (kg)
                </p>
                <p>
                    ({{ t('calculators.body_mass_index.messages.height').toLowerCase() }} (m))
                    <sup>2</sup>
                </p>
            </div>
        </div>
    </div>
</template>
