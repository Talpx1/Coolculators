<script setup lang="ts">
import Select, { type SelectChangeEvent } from 'primevue/select'
import useLocale, { type LocaleObject } from '@/composables/useLocale'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLocalizedRoute from '@/composables/useLocalizedRoute'

const options: LocaleObject[] = useLocale().localesAsArray()

const { locale } = useI18n()
const selectedLocale = ref(options.find((o) => o.code === locale.value))

const router = useRouter()
const route = useRoute()
async function onChange(e: SelectChangeEvent) {
    const localeCode = (e.value as LocaleObject).code

    try {
        const newRoute = useLocalizedRoute(route.name?.toString() as string, {
            forceLocale: localeCode
        })
        await router.replace(newRoute)
    } catch (e) {
        try {
            await router.replace({ params: { locale: localeCode } })
        } catch (e) {
            if (import.meta.env.DEV) {
                console.error(
                    `[LocaleSelector] onChange: \n unable to resolve translated route for \n ${route.fullPath}`
                )
            }

            router.replace('/')
        }
    }
}
</script>

<template>
    <Select v-model="selectedLocale" :options @change="onChange">
        <template #value="slotProps: { value: LocaleObject }">
            <div class="flex items-center gap-2">
                <img
                    :alt="slotProps.value.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.value.flag_code.toLowerCase()}`"
                    style="width: 18px"
                />
                <div>{{ slotProps.value.label }}</div>
            </div>
        </template>
        <template #option="slotProps: { option: LocaleObject; selected: boolean; index: number }">
            <div class="flex items-center">
                <img
                    :alt="slotProps.option.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.option.flag_code.toLowerCase()}`"
                    style="width: 18px"
                />
                <div>{{ slotProps.option.label }}</div>
            </div>
        </template>
    </Select>
</template>
