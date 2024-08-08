<script setup lang="ts">
import logo from '@/assets/logo.png'
import { APP_TITLE } from '@/main'
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        size?: 'small' | 'medium' | 'large' | number
    }>(),
    { size: 'small' }
)

const sizeInPx = computed(() => {
    switch (props.size) {
        default:
            return props.size
        case 'small':
            return 75
        case 'medium':
            return 150
        case 'large':
            return 300
    }
})
</script>

<template>
    <img
        :src="logo"
        :alt="APP_TITLE"
        :width="sizeInPx"
        :style="{ maxWidth: `${sizeInPx}px`, minWidth: `${sizeInPx}px` }"
    />
</template>
