<script setup lang="ts">
import InputNumber, { type InputNumberProps } from 'primevue/inputnumber'
import { useI18n } from 'vue-i18n'
import { PrimeIcons } from '@primevue/core/api'
import InputWrapper, { type InputWrapperProps } from './InputWrapper.vue'

const { locale } = useI18n()

type NumberInputProps = Omit<InputNumberProps, 'unstyled' | 'locale'> & InputWrapperProps

withDefaults(defineProps<NumberInputProps>(), {
    incrementIcon: PrimeIcons.PLUS,
    decrementIcon: PrimeIcons.MINUS,
    format: true,
    showButtons: true,
    buttonLayout: 'vertical',
    min: 0,
    mode: 'decimal',
    allowEmpty: false,
    step: 1
})

defineOptions({ inheritAttrs: false })

const value = defineModel<number | null>()
</script>

<template>
    <InputWrapper :label :label-position :label-class>
        <InputNumber v-model="value" :locale v-bind="{ ...$props, ...$attrs }" />
    </InputWrapper>
</template>
