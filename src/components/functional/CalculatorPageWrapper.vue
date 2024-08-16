<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { useSchemaOrg } from '@unhead/schema-org'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/logo.png'
import { APP_TITLE } from '@/main'
import { SUPPORTED_LOCALE_CODES, type SupportedLocale } from '@/composables/useLocale'
import useLocalizedRoutePath from '@/composables/useLocalizedRoutePath'
import PrimaryHeading from '@/components/ui/typography/PrimaryHeading.vue'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import useCalculatorList from '@/composables/useCalculatorList'
import Tag from 'primevue/tag'

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

const currentCalculator = useCalculatorList().value.find((c) => c.id === props.id)!

const appUrl = window.location.origin
const title = computed(() => `${t(`calculators.${props.id}.title`)} | ${APP_TITLE}`)
const description = computed(() => t(`calculators.${props.id}.description`))
const ogLocaleAlternate = computed(() => SUPPORTED_LOCALE_CODES.filter((l) => l !== locale.value))
useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: `${appUrl}${logo}`,
    ogLocale: locale,
    ogSiteName: APP_TITLE,
    ogLocaleAlternate,
    creator: APP_TITLE
})

const canonical = computed(() => ({
    rel: 'canonical',
    href: `${appUrl}/${locale.value}/${useLocalizedRoutePath(`calculators.${props.id}`, locale.value as SupportedLocale)}`
}))
const alternates = Object.keys(useLocalizedRoutePath(`calculators.${props.id}`)).map((locale) => ({
    rel: 'alternate',
    href: `${appUrl}/${locale}/${useLocalizedRoutePath(`calculators.${props.id}`, locale as SupportedLocale)}`,
    hreflang: locale
}))
useHead({
    link: [canonical, ...alternates],
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
        url: canonical,
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

        <slot />

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
