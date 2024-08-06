import { nextTick } from 'vue'
import { createI18n, type Composer } from 'vue-i18n'

export const i18n = createI18n({
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true
})

export const SUPPORTED_LOCALES = {
    it: { label: 'ITA', flag_code: 'it' },
    en: { label: 'ENG', flag_code: 'us' }
} as const
export const SUPPORTED_LOCALE_CODES = Object.keys(SUPPORTED_LOCALES)

export type SupportedLocale = keyof typeof SUPPORTED_LOCALES
export type LocaleObject = { label: string; flag_code: string; code: SupportedLocale }

export default function useLocale() {
    function isSupportedLocale(locale: string): locale is SupportedLocale {
        return !!(SUPPORTED_LOCALES as Record<string, any>)[locale]
    }

    function setI18nLanguage(locale: SupportedLocale) {
        if (i18n.mode !== 'composition') {
            throw new Error('i18n legacy mode MUST ber disabled to use Composition API.')
        }

        ;(i18n.global as Composer).locale.value = locale

        document.querySelector('html')!.setAttribute('lang', locale)
    }

    async function loadLocaleMessages(locale: SupportedLocale) {
        if (i18n.global.availableLocales.includes(locale)) {
            return
        }

        const messages = await import(
            /* webpackChunkName: "locale-[request]" */ `../lang/${locale}.json`
        )

        i18n.global.setLocaleMessage(locale, messages.default)

        return nextTick()
    }

    function localesAsArray(): LocaleObject[] {
        return SUPPORTED_LOCALE_CODES.map((key) => ({
            ...SUPPORTED_LOCALES[key as SupportedLocale],
            code: key as SupportedLocale
        }))
    }

    async function changeLocale(locale: SupportedLocale) {
        await loadLocaleMessages(locale)

        setI18nLanguage(locale)
    }

    return {
        setI18nLanguage,
        loadLocaleMessages,
        isSupportedLocale,
        localesAsArray,
        changeLocale
    }
}
