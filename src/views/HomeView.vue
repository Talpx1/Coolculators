<script setup lang="ts">
import Card from 'primevue/card'
import useCalculatorList from '@/composables/useCalculatorList'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const calculators = useCalculatorList()

// const { t } = useI18n()
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card v-for="calculator in calculators" :key="calculator.id">
            <template #title>{{ calculator.title }}</template>
            <template #subtitle>
                <div class="flex gap-2">
                    <Tag v-for="tag in calculator.tags" :key="`${calculator.id}_${tag}`">{{
                        tag
                    }}</Tag>
                </div>
            </template>
            <template #content>
                <p class="m-0">
                    {{ calculator.description }}
                </p>
                <!-- <RouterLink :to="calculator.route">
                    <Button :label="t('calculate')" />
                </RouterLink> -->
            </template>
        </Card>
    </div>
</template>
