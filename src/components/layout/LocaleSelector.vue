<script setup lang="ts">
import Select, { type SelectChangeEvent } from 'primevue/select'
import useLocale, { type LocaleObject } from '@/composables/useLocale'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLocalizedRoute from '@/composables/useLocalizedRoute'
import FlagEmoji from '../ui/typography/FlagEmoji.vue'

const options: LocaleObject[] = useLocale().localesAsArray()

const { locale } = useI18n()
const selectedLocale = ref(
    options.find((o) => o.code === locale.value) ??
        options.find((o) => o.code === import.meta.env.VITE_FALLBACK_LOCALE)
)

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
            <div>
                <FlagEmoji :country-code="slotProps.value.flag_code" />
                {{ slotProps.value.label }}
            </div>
        </template>
        <template #option="slotProps: { option: LocaleObject; selected: boolean; index: number }">
            <div>
                <FlagEmoji :country-code="slotProps.option.flag_code" />
                {{ slotProps.option.label }}
            </div>
        </template>
    </Select>
</template>
