<script setup lang="ts">
import Card from 'primevue/card'
import TextualLink from '../ui/TextualLink.vue'
import useSlugify from '@/composables/useSlugify'
import { useRoute } from 'vue-router'

defineProps<{ headings: string[] }>()
const route = useRoute()
</script>

<template>
    <Card>
        <template #title>
            <div v-t="'calculators.shared_messages.content_index_table'"></div>
        </template>
        <template #content>
            <ul class="list-inside list-disc space-y-2">
                <li v-for="heading in headings" :key="useSlugify(heading)">
                    <TextualLink :to="{ name: route.name, hash: `#${useSlugify(heading)}` }">
                        {{ heading }}
                    </TextualLink>
                </li>
            </ul>
        </template>
    </Card>
</template>
