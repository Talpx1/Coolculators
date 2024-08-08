<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MainLogo from '../ui/MainLogo.vue'
import CalculatorSearch from './CalculatorSearch.vue'
import LocaleSelector from './LocaleSelector.vue'
import { useDark, useToggle } from '@vueuse/core'
import { PrimeIcons } from '@primevue/core/api'
import Button from 'primevue/button'
import { APP_TITLE } from '@/main'
import { ref } from 'vue'
import AppMobileMenu from './AppMobileMenu.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const isMobileMenuVisible = ref(false)
const toggleMobileMenu = useToggle(isMobileMenuVisible)
</script>

<template>
    <header class="flex px-5 py-2 items-center justify-between gap-8">
        <RouterLink :to="{ name: 'home' }">
            <div class="flex gap-2 items-center">
                <MainLogo />
                <span class="text-3xl hidden lg:block">{{ APP_TITLE }}</span>
            </div>
        </RouterLink>

        <CalculatorSearch class="grow max-w-[768px] hidden md:flex" />

        <div class="flex items-center gap-4">
            <Button
                :icon="isDark ? PrimeIcons.SUN : PrimeIcons.MOON"
                severity="contrast"
                text
                rounded
                aria-label="Dark mode on/off"
                size="large"
                @click="toggleDark()"
            />
            <LocaleSelector class="hidden md:flex" />

            <AppMobileMenu v-model:visible="isMobileMenuVisible" />
            <Button
                :icon="PrimeIcons.BARS"
                severity="contrast"
                text
                rounded
                aria-label="Dark mode on/off"
                size="large"
                class="block md:hidden"
                @click="toggleMobileMenu()"
            />
        </div>
    </header>
</template>
