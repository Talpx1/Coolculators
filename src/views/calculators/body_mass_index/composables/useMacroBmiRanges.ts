import { computed } from 'vue'
import colors from 'tailwindcss/colors'
import { useI18n } from 'vue-i18n'
import { bmiRangeAsPercentage } from './useBmiRanges'

export type BmiMacroRange = {
    value: number
    min: number
    max: number
    label: string
    color: string
}

export default function useMacroBmiRanges() {
    const { t } = useI18n()

    return computed((): BmiMacroRange[] =>
        [
            {
                min: Number.NEGATIVE_INFINITY,
                max: 18.5,
                label: t('calculators.body_mass_index.messages.underweight'),
                color: colors.red[500]
            },
            {
                min: 18.5,
                max: 25,
                label: t('calculators.body_mass_index.messages.normal'),
                color: colors.green[500]
            },
            {
                min: 25,
                max: 30,
                label: t('calculators.body_mass_index.messages.overweight'),
                color: colors.yellow[500]
            },
            {
                min: 30,
                max: Number.POSITIVE_INFINITY,
                label: t('calculators.body_mass_index.messages.obese'),
                color: colors.red[500]
            }
        ].map((r) => ({ ...r, value: bmiRangeAsPercentage(r) }))
    )
}
