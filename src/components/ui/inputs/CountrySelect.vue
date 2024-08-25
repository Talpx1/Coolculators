<script setup lang="ts">
import Select, { type SelectProps } from 'primevue/select'
import { useI18n } from 'vue-i18n'
import InputWrapper, { type InputWrapperProps } from './InputWrapper.vue'

type Country = { name: string; code: string }
type CountrySelectProps = { countries: Country[] } & InputWrapperProps &
    Omit<SelectProps, 'unstyled' | 'locale' | 'option-label' | 'placeholder' | 'options'>

defineProps<CountrySelectProps>()
const { t, locale } = useI18n()

const selectedCountry = defineModel('selected')
</script>

<template>
    <InputWrapper :label :label-position :label-class>
        <Select
            v-model="selectedCountry"
            :options="countries"
            option-label="name"
            :placeholder="t('select_a_country')"
            class="w-full"
            :locale
            filter
            :empty-message="$props.emptyMessage ?? t('no_results')"
            :empty-filter-message="$props.emptyFilterMessage ?? t('no_results')"
            :invalid
        >
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                    <img
                        :alt="slotProps.value.label"
                        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                        :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                        style="width: 18px"
                    />
                    <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex items-center">
                    <img
                        :alt="slotProps.option.label"
                        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                        :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                        style="width: 18px"
                    />
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Select>
    </InputWrapper>
</template>
