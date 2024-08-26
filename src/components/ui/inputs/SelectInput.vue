<script setup lang="ts">
import type { SelectProps } from 'primevue/select'
import InputWrapper, { type InputWrapperProps } from './InputWrapper.vue'
import Select from 'primevue/select'

defineProps<Omit<SelectProps, 'unstyled'> & InputWrapperProps>()

const selected = defineModel('selected')
</script>

<template>
    <InputWrapper :label :label-position :label-class>
        <Select
            v-model="selected"
            class="w-full"
            :options
            :optionLabel
            :optionValue
            :placeholder
            :invalid
            :filter
        />
    </InputWrapper>
</template>
