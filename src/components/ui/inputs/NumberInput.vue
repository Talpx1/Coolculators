<script setup lang="ts">
import InputNumber, { type InputNumberProps } from 'primevue/inputnumber'
import { useI18n } from 'vue-i18n'
import { PrimeIcons } from '@primevue/core/api'
import InputWrapper, { type InputWrapperProps } from './InputWrapper.vue'

//HACK: disabling format as suffix + format is bugged on mobile

const { locale } = useI18n()

type NumberInputProps = Omit<InputNumberProps, 'unstyled' | 'locale' | 'format'> & InputWrapperProps

withDefaults(defineProps<NumberInputProps>(), {
    incrementIcon: PrimeIcons.PLUS,
    decrementIcon: PrimeIcons.MINUS,
    format: false,
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
        <InputNumber v-model="value" :locale :format="false" v-bind="{ ...$props, ...$attrs }" />
    </InputWrapper>
</template>
