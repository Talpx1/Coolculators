<script setup lang="ts">
import Card from 'primevue/card'
import useCalculatorList from '@/composables/useCalculatorList'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import PrimaryHeading from '@/components/ui/typography/PrimaryHeading.vue'
import { APP_TITLE } from '@/main'
import { watch } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import logo from '@/assets/logo.png'
import { SUPPORTED_LOCALE_CODES } from '@/composables/useLocale'

const calculators = useCalculatorList()

const { t, locale } = useI18n()

watch(locale, (newLocale) => {
    useSeoMeta({
        title: APP_TITLE,
        description: t('home.description'),
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
                href: `${window.location.origin}/${newLocale}/`
            }
        ]
    })
})
</script>

<template>
    <div class="py-16">
        <PrimaryHeading>{{ APP_TITLE }}</PrimaryHeading>
        <h2>{{ t('home.description') }}</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card v-for="calculator in calculators" :key="calculator.id">
            <template #title>
                <h3>{{ calculator.title }}</h3>
            </template>
            <template #subtitle>
                <div class="flex gap-2">
                    <Tag v-for="tag in calculator.tags" :key="`${calculator.id}_${tag}`">
                        {{ tag }}
                    </Tag>
                </div>
            </template>
            <template #content>
                <h4 class="mb-8">
                    {{ calculator.description }}
                </h4>
                <RouterLink :to="calculator.route">
                    <Button :label="t('calculate')" />
                </RouterLink>
            </template>
        </Card>
    </div>
</template>
