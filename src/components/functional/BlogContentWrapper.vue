<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import BlogHeadingIndex from './BlogHeadingIndex.vue'
import { useI18n } from 'vue-i18n'
import useSlugify from '@/composables/useSlugify'

const headings = ref<string[]>([])

function updateHeadings() {
    const h2s = [...document.querySelectorAll('#blog-content h2')].filter(
        (h) => h.textContent !== null
    )

    h2s.forEach((h2) => (h2.id = useSlugify(h2.textContent!)))

    headings.value = h2s.filter((h) => h.textContent !== null).map((e) => e.textContent!)
}

onMounted(updateHeadings)

const { locale } = useI18n()
watch(locale, updateHeadings, { flush: 'post' })
</script>

<template>
    <section class="flex flex-col gap-16 justify-self-center max-w-full" id="blog-content">
        <BlogHeadingIndex :headings="headings" />
        <slot />
    </section>
</template>
