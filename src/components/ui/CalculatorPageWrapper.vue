<script setup lang="ts">
import { useTitle } from '@vueuse/core'

const props = defineProps<{ title: string }>()

useTitle(`${props.title} | ${import.meta.env.VITE_APP_TITLE}`)
</script>

<template>
    <div class="grid grid-cols-1 place-content-center gap-24 h-full py-5">
        <h1 class="text-center text-2xl lg:text-4xl">{{ title }}</h1>

        <slot />
    </div>
</template>
