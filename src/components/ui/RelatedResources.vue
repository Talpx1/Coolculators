<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TextualLink from './TextualLink.vue'

withDefaults(defineProps<{ resources: string[]; label?: string }>(), {
    label: 'more_resources_on_the_topic'
})
const { t } = useI18n()
</script>

<template>
    <div>
        {{ t(label) }}:
        <ul class="list-inside list-disc">
            <li v-for="resource in resources" :key="resource">
                <TextualLink :to="resource">
                    {{ resource }}
                </TextualLink>
            </li>
        </ul>
    </div>
</template>
