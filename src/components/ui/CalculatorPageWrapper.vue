<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { useSchemaOrg } from '@unhead/schema-org'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/logo.png'
import { APP_TITLE } from '@/main'
import { SUPPORTED_LOCALE_CODES, type SupportedLocale } from '@/composables/useLocale'
import useLocalizedRoutePath from '@/composables/useLocalizedRoutePath'
import PrimaryHeading from './typography/PrimaryHeading.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ id: string }>()

const { t, locale } = useI18n()

const route = useRoute()

watch(
    locale,
    (newLocale) => {
        const title = t(`calculators.${props.id}.title`)
        const description = t(`calculators.${props.id}.description`)
        const appUrl = window.location.origin
        const canonical = `${appUrl}/${newLocale}/${useLocalizedRoutePath(`calculators.${props.id}`, newLocale as SupportedLocale)}`

        useSeoMeta({
            title,
            description,
            ogImage: logo,
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
                }
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
                applicationCategory: 'HealthApplication',
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
    <div class="grid grid-cols-1 place-content-center gap-32 h-full py-5">
        <div class="text-center">
            <PrimaryHeading>{{ t(`calculators.${props.id}.title`) }}</PrimaryHeading>

            <h2>{{ t(`calculators.${props.id}.description`) }}</h2>
        </div>

        <slot />
    </div>
</template>
