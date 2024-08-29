<script setup lang="ts">
import type { SelectProps } from 'primevue/select'
import InputWrapper, { type InputWrapperProps } from './InputWrapper.vue'
import Select from 'primevue/select'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

const props = defineProps<Omit<SelectProps, 'unstyled'> & InputWrapperProps>()

const selected = defineModel('selected')

const { locale } = useI18n()
watch(locale, () => {
    if (!props.dataKey) {
        return
    }

    selected.value = props.options?.find(
        (o) => (selected.value as any)[props.dataKey!] === o[props.dataKey!]
    )
})
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
            :dataKey
        />
    </InputWrapper>
</template>
