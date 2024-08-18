<script setup lang="ts">
import type { CalculatorObject } from '@/composables/useCalculatorList'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

withDefaults(defineProps<{ calculator: CalculatorObject; useHeadings?: boolean }>(), {
    useHeadings: false
})
</script>

<template>
    <Card>
        <template #title>
            <h3 v-if="useHeadings">{{ calculator.title }}</h3>
            <div v-else>{{ calculator.title }}</div>
        </template>
        <template #subtitle>
            <div class="flex flex-wrap gap-2">
                <Tag v-for="tag in calculator.tags" :key="`${calculator.id}_${tag}`">
                    {{ tag }}
                </Tag>
            </div>
        </template>
        <template #content>
            <h4 v-if="useHeadings" class="mb-8">
                {{ calculator.description }}
            </h4>
            <div v-else class="mb-8">
                {{ calculator.description }}
            </div>
            <RouterLink :to="calculator.route">
                <Button :label="t('calculate')" />
            </RouterLink>
        </template>
    </Card>
</template>
