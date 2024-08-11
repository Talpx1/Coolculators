<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/logo.png'
import { APP_TITLE } from '@/main'
import { SUPPORTED_LOCALE_CODES, type SupportedLocale } from '@/composables/useLocale'
import useLocalizedRoutePath from '@/composables/useLocalizedRoutePath'
import PrimaryHeading from './typography/PrimaryHeading.vue'

const props = defineProps<{ id: string }>()

const { t, locale } = useI18n()

const canonical = `${window.location.hostname}/${locale.value}/${useLocalizedRoutePath(`calculators.${props.id}`, locale.value as SupportedLocale)}`

useHead({
    link: [
        {
            rel: 'canonical',
            href: canonical
        }
    ]
})

useSeoMeta({
    title: `${t(`calculators.${props.id}.title`)}`,
    description: t(`calculators.${props.id}.description`),
    ogImage: logo,
    ogLocale: locale.value,
    ogSiteName: APP_TITLE,
    ogLocaleAlternate: SUPPORTED_LOCALE_CODES.filter((l) => l !== locale.value),
    creator: APP_TITLE
})
</script>

<template>
    <div class="grid grid-cols-1 place-content-center gap-32 h-full py-5">
        <PrimaryHeading class="text-center">{{
            t(`calculators.${props.id}.title`)
        }}</PrimaryHeading>

        <slot />
    </div>
</template>
