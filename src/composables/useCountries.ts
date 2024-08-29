import countries from '@/data/countries'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useCountries() {
    const { t } = useI18n()

    function translateNames() {
        return countries.map((c) => ({ ...c, name: t(`countries.${c.name}`) }))
    }

    return computed(() => translateNames())
}
