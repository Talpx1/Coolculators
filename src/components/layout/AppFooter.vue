<script setup lang="ts">
import { APP_TITLE } from '@/main'
import { useToggle } from '@vueuse/core'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { PrimeIcons } from '@primevue/core/api'
import I18nTranslator from '../i18n/I18nTranslator.vue'

const { t } = useI18n()

const isPrivacyDialogOpen = ref(false)
const isContactDialogOpen = ref(false)
const isAboutDialogOpen = ref(false)

const togglePrivacyDialog = useToggle(isPrivacyDialogOpen)
const toggleContactDialog = useToggle(isContactDialogOpen)
const toggleAboutDialog = useToggle(isAboutDialogOpen)
</script>

<template>
    <footer class="flex flex-col-reverse md:flex-row px-5 py-5 items-center justify-between gap-8">
        &copy;{{ new Date().getFullYear() }} {{ APP_TITLE }}

        <div class="flex flex-col md:flex-row gap-4 md:gap-8">
            <a href="https://buymeacoffee.com/talp1" target="_blank">
                <Button text :label="t('support_my_work')" />
            </a>
            <Button text :label="t('contact_us')" @click="toggleContactDialog()" />
            <Button text label="ℹ️ About" @click="toggleAboutDialog()" />
            <Button text label="🍪 Privacy" @click="togglePrivacyDialog()" />
        </div>

        <Dialog modal v-model:visible="isPrivacyDialogOpen" header="🍪 Privacy">
            {{ t('privacy_disclaimer') }}
        </Dialog>

        <Dialog modal v-model:visible="isContactDialogOpen" :header="t('contact_us')">
            <a href="mailto:hello@coolculators.com" class="flex items-center gap-4">
                hello@coolculators.com
            </a>
        </Dialog>

        <Dialog modal v-model:visible="isAboutDialogOpen" header="ℹ️ About">
            <I18nTranslator keypath="about" tag="p">
                <template #age>
                    {{
                        Math.abs(
                            new Date(
                                Date.now() - new Date('03/04/2001').getTime()
                            ).getUTCFullYear() - 1970
                        ).toString()
                    }}
                </template>
            </I18nTranslator>

            <div class="mt-4">
                <a href="https://buymeacoffee.com/talp1" target="_blank">
                    <Button :label="t('support_my_work')" />
                </a>
            </div>
        </Dialog>
    </footer>
</template>
