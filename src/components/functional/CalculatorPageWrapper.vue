<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { useSchemaOrg } from '@unhead/schema-org'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/logo.png'
import { APP_TITLE } from '@/main'
import { SUPPORTED_LOCALE_CODES, type SupportedLocale } from '@/composables/useLocale'
import useLocalizedRoutePath from '@/composables/useLocalizedRoutePath'
import PrimaryHeading from '@/components/ui/typography/PrimaryHeading.vue'
import { watch } from 'vue'
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

watch(
    locale,
    (newLocale) => {
        const title = t(`calculators.${props.id}.title`)
        const description = t(`calculators.${props.id}.description`)
        const appUrl = window.location.origin
        const canonical = `${appUrl}/${newLocale}/${useLocalizedRoutePath(`calculators.${props.id}`, newLocale as SupportedLocale)}`

        useSeoMeta({
            title: `${title} | ${APP_TITLE}`,
            description,
            ogImage: `${appUrl}${logo}`,
            ogLocale: newLocale,
            ogSiteName: APP_TITLE,
            ogLocaleAlternate: SUPPORTED_LOCALE_CODES.filter((l) => l !== newLocale),
            creator: APP_TITLE
        })

        useHead({
            link: [
                {
                    rel: 'canonical',
                    href: canonical
                },
                ...Object.keys(useLocalizedRoutePath(`calculators.${props.id}`))
                    .filter((l) => l !== locale.value)
                    .map((locale) => ({
                        rel: 'alternate',
                        href: `${appUrl}/${locale}/${useLocalizedRoutePath(`calculators.${props.id}`, locale as SupportedLocale)}`,
                        hreflang: locale
                    }))
            ],
            templateParams: {
                schemaOrg: {
                    host: appUrl,
                    path: route.fullPath,
                    inLanguage: newLocale
                }
            }
        })

        useSchemaOrg([
            {
                '@type': 'WebApplication',
                inLanguage: newLocale,
                name: title,
                description,
                url: canonical,
                applicationCategory: props.applicationCategory,
                operatingSystem: 'Web',
                provider: {
                    '@type': 'Organization',
                    name: APP_TITLE,
                    url: window.location.origin
                }
            }
        ])
    },
    { immediate: true }
)
</script>

<template>
    <div class="grid grid-cols-1 place-content-center gap-16 lg:gap-32 h-full py-5">
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
