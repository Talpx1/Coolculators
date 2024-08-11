import { computed } from 'vue'
import colors from 'tailwindcss/colors'
import { useI18n } from 'vue-i18n'

export type BmiRange = {
    min: number
    max: number
    label: string
    color: string
    value: number
}

export const [MIN_BMI, MAX_BMI] = [13, 43] as const

export function bmiRangeAsPercentage(range: Pick<BmiRange, 'max' | 'min'>) {
    const min = isFinite(range.min) ? range.min : MIN_BMI
    const max = isFinite(range.max) ? range.max : MAX_BMI

    return ((max - min) * 100) / (MAX_BMI - MIN_BMI)
}

export default function useBmiRanges() {
    const { t } = useI18n()

    return computed((): BmiRange[] =>
        [
            {
                min: Number.NEGATIVE_INFINITY,
                max: 16,
                label: t('calculators.body_mass_index.messages.severe_thinness'),
                color: colors.red[700]
            },

            {
                min: 16,
                max: 17,
                label: t('calculators.body_mass_index.messages.moderate_thinness'),
                color: colors.red[500]
            },

            {
                min: 17,
                max: 18.5,
                label: t('calculators.body_mass_index.messages.mild_thinness'),
                color: colors.yellow[500]
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
                max: 35,
                label: t('calculators.body_mass_index.messages.obese_class_1'),
                color: colors.red[500]
            },

            {
                min: 35,
                max: 40,
                label: t('calculators.body_mass_index.messages.obese_class_2'),
                color: colors.red[700]
            },

            {
                min: 40,
                max: Number.POSITIVE_INFINITY,
                label: t('calculators.body_mass_index.messages.obese_class_3'),
                color: colors.red[800]
            }
        ].map((r) => ({ ...r, value: bmiRangeAsPercentage(r) }))
    )
}
