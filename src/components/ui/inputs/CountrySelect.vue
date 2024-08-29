<script setup lang="ts">
import Select, { type SelectProps } from 'primevue/select'
import { useI18n } from 'vue-i18n'
import InputWrapper, { type InputWrapperProps } from './InputWrapper.vue'
import useFlagEmoji from '@/composables/useFlagEmoji'
import { watch } from 'vue'

type Country = { name: string; code: string }
type CountrySelectProps = { countries: Country[] } & InputWrapperProps &
    Omit<
        SelectProps,
        'unstyled' | 'locale' | 'option-label' | 'placeholder' | 'options' | 'dataKey'
    >

const props = defineProps<CountrySelectProps>()
const { t, locale } = useI18n()

const selectedCountry = defineModel('selected')

watch(locale, () => {
    selectedCountry.value = props.countries.find(
        (o) => (selectedCountry.value as Country).code === o.code
    )
})
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
            dataKey="code"
        >
            <template #value="slotProps">
                <div v-if="slotProps.value">
                    <span class="text-xl">{{ useFlagEmoji().fromCode(slotProps.value.code) }}</span>
                    {{ slotProps.value.name }}
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div>
                    <span class="text-xl">{{
                        useFlagEmoji().fromCode(slotProps.option.code)
                    }}</span>
                    {{ slotProps.option.name }}
                </div>
            </template>
        </Select>
    </InputWrapper>
</template>
