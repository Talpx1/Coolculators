<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <footer
        class="flex px-5 py-2 items-center justify-between gap-8 bg-primary-50 dark:bg-primary-700"
    >
        &copy;{{ new Date().getFullYear() }} Coolculators

        <div class="flex gap-8">
            <RouterLink :to="{ name: '' }">Privacy</RouterLink>
            <RouterLink :to="{ name: '' }">Contattaci</RouterLink>
        </div>
    </footer>
</template>
