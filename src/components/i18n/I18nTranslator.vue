<script setup lang="ts">
import type { TranslationProps } from 'vue-i18n'

defineProps<TranslationProps>()
</script>

<template>
    <i18n-t :keypath :tag scope="global">
        <template #break> <br /> </template>
        <template #space> <br /><br /> </template>
        <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </i18n-t>
</template>
