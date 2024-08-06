<script setup lang="ts">
import logo from '@/assets/logo.png'

const props = withDefaults(
    defineProps<{
        size?: 'small' | 'medium' | 'large'
    }>(),
    { size: 'small' }
)

function widthFromSize() {
    switch (props.size) {
        case 'small':
            return 100
        case 'medium':
            return 250
        case 'large':
            return 400
    }
}
</script>

<template>
    <img :src="logo" alt="Coolculators" :width="widthFromSize()" />
</template>
