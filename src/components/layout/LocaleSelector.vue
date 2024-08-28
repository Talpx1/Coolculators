<script setup lang="ts">
import Select, { type SelectChangeEvent } from 'primevue/select'
import useLocale, { type LocaleObject } from '@/composables/useLocale'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLocalizedRoute from '@/composables/useLocalizedRoute'
import useFlagEmoji from '@/composables/useFlagEmoji'

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
                <span class="text-xl">{{
                    useFlagEmoji().fromCode(slotProps.value.flag_code)
                }}</span>
                {{ slotProps.value.label }}
            </div>
        </template>
        <template #option="slotProps: { option: LocaleObject; selected: boolean; index: number }">
            <div>
                <span class="text-xl">{{
                    useFlagEmoji().fromCode(slotProps.option.flag_code)
                }}</span>
                {{ slotProps.option.label }}
            </div>
        </template>
    </Select>
</template>
