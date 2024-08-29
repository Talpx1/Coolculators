<script setup lang="ts">
import useCalculatorsList from '@/composables/useCalculatorsList'
import type { CalculatorObject } from '@/data/calculators'
import AutoComplete, {
    type AutoCompleteCompleteEvent,
    type AutoCompleteOptionSelectEvent
} from 'primevue/autocomplete'
import { useToast } from 'primevue/usetoast'
import { ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const query = ref('')

const allItems = useCalculatorsList()
const found = ref<CalculatorObject[]>([])

function search(event: AutoCompleteCompleteEvent) {
    found.value = event.query
        ? allItems.value
              .map((i) => unref(i))
              .filter((item) => item.title.toLowerCase().includes(event.query.toLowerCase()))
        : allItems.value.map((i) => unref(i))
}

const router = useRouter()
const toast = useToast()
const onOptionSelection = async (e: AutoCompleteOptionSelectEvent) => {
    const calculatorObject = e.value as CalculatorObject

    try {
        await router.push(calculatorObject.route)
    } catch (e) {
        if (import.meta.env.DEV) {
            console.error(`[Calculator Search] onOptionSelection -> router.push: \n ${e}`)
            toast.add({
                severity: 'warn',
                summary: t('calculator_not_available_toast_summary'),
                detail: t('calculator_not_available_toast_detail', [calculatorObject.title]),
                closable: true,
                life: 5000
            })
            query.value = ''
        }
    }
}
</script>

<template>
    <AutoComplete
        v-model="query"
        dropdown
        :suggestions="found"
        @complete="search"
        option-label="title"
        @option-select="onOptionSelection"
        input-class="w-full !rounded-r-none"
        :empty-search-message="t('no_results')"
        :placeholder="t('search_a_calculator')"
        data-key="id"
    />
</template>
