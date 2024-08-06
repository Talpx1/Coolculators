<script setup lang="ts">
import { RouterLink } from 'vue-router'
import MainLogo from '../ui/MainLogo.vue'
import CalculatorSearch from './CalculatorSearch.vue'
import LocaleSelector from './LocaleSelector.vue'
</script>

<template>
    <header
        class="flex px-5 py-2 items-center justify-between gap-8 bg-primary-50 dark:bg-primary-700"
    >
        <RouterLink :to="{ name: 'home' }">
            <div class="flex gap-2 items-center">
                <MainLogo /><span class="text-3xl">Coolculators</span>
            </div>
        </RouterLink>

        <CalculatorSearch class="grow max-w-[768px]" />

        <LocaleSelector />
    </header>
</template>
