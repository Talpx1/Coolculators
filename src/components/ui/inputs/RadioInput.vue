<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import InputWrapper, { type InputWrapperProps } from './InputWrapper.vue'
import type { RadioButtonProps } from 'primevue/radiobutton'
import RadioButton from 'primevue/radiobutton'

const { locale } = useI18n()

type RadioInputProps = {
    entries: (Omit<RadioButtonProps, 'unstyled' | 'locale' | 'name' | 'inputId'> & {
        label: string
    } & InputWrapperProps)[]
    name?: string
    groupLabel?: string
    orientation?: 'vertical' | 'horizontal'
}

withDefaults(defineProps<RadioInputProps>(), { orientation: 'horizontal' })

const value = defineModel()
</script>

<template>
    <div class="w-fit">
        <label v-if="groupLabel">{{ groupLabel }}</label>
        <div
            class="flex"
            :class="{
                'flex-col': orientation === 'vertical',
                'gap-8': orientation === 'horizontal'
            }"
        >
            <InputWrapper
                v-for="entry in entries"
                :key="entry.value"
                :label="entry.label"
                :label-position="entry.labelPosition ?? 'right'"
                :label-class="entry.labelClass"
                :input-id="
                    entry.inputId ??
                    `${entry.label.toLowerCase().replace(' ', '-')}_${entry.value.toString().toLowerCase().replace(' ', '-')}`
                "
            >
                <RadioButton
                    v-model="value"
                    :locale
                    v-bind="{ ...entry }"
                    :input-id="
                        entry.inputId ??
                        `${entry.label.toLowerCase().replace(' ', '-')}_${entry.value.toString().toLowerCase().replace(' ', '-')}`
                    "
                />
            </InputWrapper>
        </div>
    </div>
</template>
