<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useBmiRanges from '../composables/useBmiRanges'
import Card from 'primevue/card'

const { t } = useI18n()
const bmiRanges = useBmiRanges()
</script>

<template>
    <Card>
        <template #title>
            <h2 class="text-xl font-bold text-center">
                {{ t('calculators.body_mass_index.messages.bmi_ranges') }}
            </h2>
        </template>
        <template #content>
            <div class="flex flex-col divide-y">
                <div
                    class="grid grid-cols-2 gap-5 p-3 grid-rows-1"
                    v-for="range in bmiRanges"
                    :key="range.label"
                    :style="{
                        color: range.color
                    }"
                >
                    <h3>{{ range.label }}</h3>
                    <p>
                        {{
                            [
                                isFinite(range.min) && `>=${range.min}`,
                                isFinite(range.max) && `<${range.max}`
                            ]
                                .filter((x) => x !== false)
                                .join('&nbsp;&nbsp;-&nbsp;&nbsp;')
                        }}
                    </p>
                </div>
            </div>
        </template>
    </Card>
</template>
