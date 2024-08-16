<script setup lang="ts">
import { computed } from 'vue'

export type InputWrapperProps = {
    label?: string
    labelClass?: string | object
    labelPosition?: 'top' | 'bottom' | 'left' | 'right'
    inputId?: string
}

const props = withDefaults(defineProps<InputWrapperProps>(), { labelPosition: 'top' })

const computedLabelClasses = computed(() => {
    let classes = {
        'order-1': props.labelPosition === 'top' || props.labelPosition === 'left',
        'order-2': props.labelPosition === 'bottom' || props.labelPosition === 'right'
    }

    if (!props.labelClass) {
        return classes
    }

    if (typeof props.labelClass === 'object') {
        classes = { ...classes, ...props.labelClass }
        return classes
    }

    props.labelClass?.split(' ').forEach((c) => (classes = { ...classes, [c]: true }))

    return classes
})
</script>

<template>
    <div
        class="flex"
        :class="{
            'flex-col': labelPosition === 'top' || labelPosition === 'bottom'
        }"
    >
        <label class="p-1" :class="computedLabelClasses" :for="inputId">{{ label }}</label>
        <div
            :class="{
                'order-2': labelPosition === 'top' || labelPosition === 'left',
                'order-1': labelPosition === 'bottom' || labelPosition === 'right'
            }"
        >
            <slot />
        </div>
    </div>
</template>
