<script setup lang="ts">
import MainLogo from '@/components/ui/MainLogo.vue'
import Button from 'primevue/button'
</script>

<template>
    <main class="min-h-[100dvh] grid place-content-center gap-32 justify-items-center">
        <MainLogo size="medium" />

        <div>
            <div class="text-xl font-bold">Formula:</div>
            <div class="flex gap-1 items-center">
                not + found =
                <h1 class="text-3xl font-bold">404</h1>
            </div>
        </div>

        <RouterLink :to="{ path: '/' }">
            <Button class="text-4xl" label="🔙🏠" />
        </RouterLink>
    </main>
</template>
