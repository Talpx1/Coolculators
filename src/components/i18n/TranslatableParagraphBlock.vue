<script setup lang="ts">
import { computed } from 'vue'
import SecondaryHeading from '../ui/typography/SecondaryHeading.vue'
import TextParagraph from '../ui/typography/TextParagraph.vue'
import I18nTranslator from './I18nTranslator.vue'

const props = defineProps<{
    titleKeypath: string
    paragraphKeypath?: string
}>()

const _paragraphKeypath = computed(
    () => props.paragraphKeypath ?? `${props.titleKeypath}_description`
)
</script>

<template>
    <div>
        <SecondaryHeading>
            <I18nTranslator :keypath="titleKeypath">
                <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
                    <slot :name="slotName" v-bind="slotProps ?? {}" />
                </template>
            </I18nTranslator>
        </SecondaryHeading>

        <TextParagraph>
            <I18nTranslator :keypath="_paragraphKeypath">
                <template v-for="(_, slotName) in $slots" v-slot:[slotName]="slotProps">
                    <slot :name="slotName" v-bind="slotProps ?? {}" />
                </template>
            </I18nTranslator>
        </TextParagraph>
    </div>
</template>
