<script setup lang="ts">
import Drawer from 'primevue/drawer'
import MainLogo from '../ui/MainLogo.vue'
import { APP_TITLE } from '@/main'
import { onBeforeRouteUpdate } from 'vue-router'
import CalculatorSearch from './CalculatorSearch.vue'
import LocaleSelector from './LocaleSelector.vue'
import Button from 'primevue/button'
import { PrimeIcons } from '@primevue/core/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const visible = defineModel('visible')

onBeforeRouteUpdate(() => {
    visible.value = false
    return true
})
</script>

<template>
    <aside>
        <Drawer v-model:visible="visible" class="!w-full md:!w-80">
            <template #header>
                <RouterLink :to="{ name: 'home' }">
                    <div class="flex gap-2 items-center">
                        <MainLogo />
                        <span class="text-xl">{{ APP_TITLE }}</span>
                    </div>
                </RouterLink>
            </template>

            <div class="flex flex-col gap-16 py-8">
                <CalculatorSearch />
                <LocaleSelector />
            </div>

            <a href="https://buymeacoffee.com/talp1" target="_blank">
                <Button text :label="t('support_my_work')" :icon="PrimeIcons.HEART_FILL" />
            </a>
        </Drawer>
    </aside>
</template>
