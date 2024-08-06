<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseHeader from './BaseHeader.vue'
import BaseFooter from './BaseFooter.vue'
import Toast from 'primevue/toast'
</script>

<template>
    <BaseHeader />
    <main class="bg-slate-600 p-5 flex justify-center">
        <Toast />
        <div class="container">
            <RouterView />
        </div>
    </main>
    <BaseFooter />
</template>
