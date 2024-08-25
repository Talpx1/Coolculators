<script setup lang="ts">
import type { MultiSelectProps } from 'primevue/multiselect'
import InputWrapper, { type InputWrapperProps } from './InputWrapper.vue'
import MultiSelect from 'primevue/multiselect'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

const { locale } = useI18n()

const props = withDefaults(defineProps<Omit<MultiSelectProps, 'unstyled'> & InputWrapperProps>(), {
    display: 'chip'
})

const selected = defineModel('selected')

watch(locale, () => {
    if (!props.dataKey || !(selected.value instanceof Array)) {
        return
    }

    selected.value = props.options?.filter((o) =>
        (selected.value as any[]).map((s) => s[props.dataKey!]).includes(o[props.dataKey!])
    )
})
</script>

<template>
    <InputWrapper :label :label-position :label-class>
        <MultiSelect
            v-model="selected"
            class="w-full"
            :options
            :optionLabel
            :optionValue
            :placeholder
            :filter
            :display
            :data-key
            :invalid
        />
    </InputWrapper>
</template>
