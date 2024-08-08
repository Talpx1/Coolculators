<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from './AppHeader.vue'
import BaseFooter from './AppFooter.vue'
import Toast from 'primevue/toast'
</script>

<template>
    <BaseHeader />
    <main class="p-5 flex justify-center">
        <Toast />
        <div class="container">
            <RouterView />
        </div>
    </main>
    <BaseFooter />
</template>
