<script setup lang="ts">
import { APP_TITLE } from '@/main'
import { useToggle } from '@vueuse/core'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { PrimeIcons } from '@primevue/core/api'

const { t } = useI18n()

const isPrivacyDialogOpen = ref(false)
const isContactDialogOpen = ref(false)

const togglePrivacyDialog = useToggle(isPrivacyDialogOpen)
const toggleContactDialog = useToggle(isContactDialogOpen)
</script>

<template>
    <footer class="flex flex-col-reverse md:flex-row px-5 py-2 items-center justify-between gap-8">
        &copy;{{ new Date().getFullYear() }} {{ APP_TITLE }}

        <div class="flex flex-col md:flex-row gap-4 md:gap-8">
            <a href="https://buymeacoffee.com/talp1" target="_blank">
                <Button text :label="t('support_my_work')" :icon="PrimeIcons.HEART_FILL" />
            </a>
            <Button text label="Privacy" @click="togglePrivacyDialog()" />
            <Button text :label="t('contact_us')" @click="toggleContactDialog()" />
        </div>

        <Dialog v-model:visible="isPrivacyDialogOpen" header="Privacy">
            {{ t('privacy_disclaimer') }}
        </Dialog>

        <Dialog v-model:visible="isContactDialogOpen" :header="t('contact_us')">
            <a href="mailto:hello@coolculators.com" class="flex items-center gap-4">
                <span :class="PrimeIcons.ENVELOPE"></span>
                hello@coolculators.com
            </a>
        </Dialog>
    </footer>
</template>
