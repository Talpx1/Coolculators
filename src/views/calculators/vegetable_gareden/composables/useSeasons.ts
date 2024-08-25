import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useSeasons() {
    const { t } = useI18n()

    const seasons = computed(() => ({
        spring: t('calculators.shared_messages.seasons.spring'),
        fall: t('calculators.shared_messages.seasons.fall'),
        winter: t('calculators.shared_messages.seasons.winter'),
        summer: t('calculators.shared_messages.seasons.summer'),
        late_spring: t('calculators.shared_messages.seasons.late_spring')
    }))

    return seasons
}
