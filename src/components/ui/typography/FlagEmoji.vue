<script setup lang="ts">
import useFlagEmoji from '@/composables/useFlagEmoji'

defineProps<{ countryCode?: string }>()
</script>

<template>
    <span class="text-xl flag-emoji" v-if="countryCode">
        {{ useFlagEmoji().fromCode(countryCode) }}
    </span>
    <span class="text-xl flag-emoji" v-else>
        <slot />
    </span>
</template>
