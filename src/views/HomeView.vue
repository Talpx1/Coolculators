<script setup lang="ts">
import useCalculatorList from '@/composables/useCalculatorList'
import { useI18n } from 'vue-i18n'
import PrimaryHeading from '@/components/ui/typography/PrimaryHeading.vue'
import { APP_TITLE } from '@/main'
import { computed } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import logo from '@/assets/logo.png'
import { SUPPORTED_LOCALE_CODES } from '@/composables/useLocale'
import CalculatorCard from '@/components/ui/CalculatorCard.vue'

const calculators = useCalculatorList()

const { t, locale } = useI18n()

const appUrl = window.location.origin

const alternates = SUPPORTED_LOCALE_CODES.map((locale) => ({
    rel: 'alternate',
    href: `${appUrl}/${locale}`,
    hreflang: locale
}))

const description = computed(() => t('home.description'))
const logoUrl = `${appUrl}${logo}`
const title = computed(() => `${APP_TITLE} - ${t('home.title')}`)
const ogLocaleAlternate = computed(() => SUPPORTED_LOCALE_CODES.filter((l) => l !== locale.value))
useSeoMeta({
    title,
    description,
    creator: APP_TITLE,

    ogTitle: title,
    ogDescription: description,
    ogImage: logoUrl,
    ogLocale: locale,
    ogSiteName: APP_TITLE,
    ogLocaleAlternate,

    twitterCard: 'summary',
    twitterTitle: title,
    twitterImage: logoUrl,
    twitterDescription: description,
    twitterCreator: APP_TITLE
})

const canonical = computed(() => ({
    rel: 'canonical',
    href: `${appUrl}/${locale.value}`
}))
useHead({
    link: [canonical, ...alternates]
})
</script>

<template>
    <div class="py-16">
        <PrimaryHeading>{{ APP_TITLE }}</PrimaryHeading>
        <h2>{{ t('home.description') }}</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CalculatorCard
            v-for="calculator in calculators"
            :calculator
            use-headings
            :key="calculator.id"
        />
    </div>
</template>
