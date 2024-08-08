<script setup lang="ts">
import { APP_TITLE } from '@/main'
import { RouterLink } from 'vue-router'
</script>

<template>
    <footer class="flex flex-col-reverse md:flex-row px-5 py-2 items-center justify-between gap-8">
        &copy;{{ new Date().getFullYear() }} {{ APP_TITLE }}

        <div class="flex gap-8">
            <RouterLink :to="{ name: '' }">Privacy</RouterLink>
            <RouterLink :to="{ name: '' }">Contattaci</RouterLink>
        </div>
    </footer>
</template>
