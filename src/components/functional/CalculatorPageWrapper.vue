<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { useSchemaOrg } from '@unhead/schema-org'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/logo.png'
import { APP_TITLE } from '@/main'
import { SUPPORTED_LOCALE_CODES, type SupportedLocale } from '@/composables/useLocale'
import useLocalizedRoutePath from '@/composables/useLocalizedRoutePath'
import PrimaryHeading from '@/components/ui/typography/PrimaryHeading.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useCalculatorsList from '@/composables/useCalculatorsList'
import Tag from 'primevue/tag'
import CalculatorCard from '../ui/CalculatorCard.vue'
import BlogContentWrapper from './BlogContentWrapper.vue'

type ApplicationCategory =
    | 'GameApplication'
    | 'SocialNetworkingApplication'
    | 'TravelApplication'
    | 'ShoppingApplication'
    | 'SportsApplication'
    | 'LifestyleApplication'
    | 'BusinessApplication'
    | 'DesignApplication'
    | 'DeveloperApplication'
    | 'DriverApplication'
    | 'EducationalApplication'
    | 'HealthApplication'
    | 'FinanceApplication'
    | 'SecurityApplication'
    | 'BrowserApplication'
    | 'CommunicationApplication'
    | 'DesktopEnhancementApplication'
    | 'EntertainmentApplication'
    | 'MultimediaApplication'
    | 'HomeApplication'
    | 'UtilitiesApplication'
    | 'ReferenceApplication'

const props = defineProps<{ id: string; applicationCategory: ApplicationCategory }>()

const { t, locale } = useI18n()

const route = useRoute()

const allCalculators = useCalculatorsList()
const currentCalculator = computed(() => allCalculators.value.find((c) => c.id === props.id)!)
const relatedCalculators = computed(() =>
    allCalculators.value
        .map((c) => ({
            ...c,
            common_tags: currentCalculator.value.tags.filter((tag) => c.tags.includes(tag))
        }))
        .filter((c) => c.common_tags.length >= 2 && c.id !== currentCalculator.value.id)
        .sort((c1, c2) => {
            if (c1.common_tags.length > c2.common_tags.length) {
                return -1
            }
            if (c1.common_tags.length < c2.common_tags.length) {
                return 1
            }
            return 0
        })
        .slice(0, 5)
)

const appUrl = window.location.origin
const title = computed(() => `${t(`calculators.${props.id}.title`)} | ${APP_TITLE}`)
const description = computed(() => t(`calculators.${props.id}.description`))
const ogLocaleAlternate = computed(() => SUPPORTED_LOCALE_CODES.filter((l) => l !== locale.value))
const logoUrl = `${appUrl}${logo}`
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

const canonicalUrl = computed(
    () =>
        `${appUrl}/${locale.value}/${useLocalizedRoutePath(`calculators.${props.id}`, locale.value as SupportedLocale)}`
)
const canonicalObj = computed(() => ({
    rel: 'canonical',
    href: canonicalUrl.value
}))
const alternates = Object.keys(useLocalizedRoutePath(`calculators.${props.id}`)).map((locale) => ({
    rel: 'alternate',
    href: `${appUrl}/${locale}/${useLocalizedRoutePath(`calculators.${props.id}`, locale as SupportedLocale)}`,
    hreflang: locale
}))
useHead({
    link: [canonicalObj, ...alternates],
    templateParams: {
        schemaOrg: {
            host: appUrl,
            path: route.fullPath,
            inLanguage: locale
        }
    }
})

useSchemaOrg([
    {
        '@type': 'WebApplication',
        inLanguage: locale,
        name: title,
        description,
        url: canonicalUrl,
        applicationCategory: props.applicationCategory,
        operatingSystem: 'Web',
        provider: {
            '@type': 'Organization',
            name: APP_TITLE,
            url: appUrl
        }
    }
])
</script>

<template>
    <div
        class="grid grid-cols-1 place-content-center gap-16 lg:gap-32 h-full py-5 justify-items-center"
    >
        <div class="text-center">
            <PrimaryHeading>{{ t(`calculators.${props.id}.title`) }}</PrimaryHeading>

            <h2>{{ t(`calculators.${props.id}.description`) }}</h2>
        </div>

        <slot name="calculator" />

        <BlogContentWrapper class="my-8">
            <slot name="blog" />
        </BlogContentWrapper>

        <div v-if="relatedCalculators.length">
            <div class="font-bold mb-4 text-xl">{{ t('related_calculators') }}</div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <CalculatorCard
                    v-for="calculator in relatedCalculators"
                    :calculator
                    :key="calculator.id"
                />
            </div>
        </div>

        <div>
            <h2>Tags:</h2>
            <div class="flex flex-wrap gap-2">
                <Tag v-for="tag in currentCalculator.tags" :key="tag">
                    <h3>{{ tag }}</h3>
                </Tag>
            </div>
        </div>
    </div>
</template>
