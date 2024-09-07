<script setup lang="ts">
import type { RouteLocationRaw, RouterLinkProps } from 'vue-router'

defineProps<
    Omit<RouterLinkProps, 'to'> & { to: string | RouteLocationRaw; wrapperClasses?: string }
>()

defineOptions({ inheritAttrs: false })

function isExternal(destination: string | RouteLocationRaw): destination is string {
    return typeof destination === 'string' && destination.startsWith('http')
}
</script>

<template>
    <div :class="`text-primary-500 underline inline ${wrapperClasses}`">
        <a
            v-if="isExternal($props.to)"
            v-bind="$attrs"
            :target="($attrs.target as string) ?? '_blank'"
            :href="$props.to"
        >
            <slot />
        </a>
        <RouterLink v-else v-bind="{ ...$props, ...$attrs }" :to="$props.to">
            <slot />
        </RouterLink>
    </div>
</template>
