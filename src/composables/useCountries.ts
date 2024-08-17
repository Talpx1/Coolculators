import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type Country = { name: string; code: string }

export default function useCountries() {
    const { t } = useI18n()

    return computed(() => [
        { name: t('countries.france'), code: 'fr' },
        { name: t('countries.germany'), code: 'de' },
        { name: t('countries.italy'), code: 'it' },
        { name: t('countries.netherlands'), code: 'nl' },
        { name: t('countries.spain'), code: 'es' },
        { name: t('countries.usa'), code: 'us' }
    ])
}
