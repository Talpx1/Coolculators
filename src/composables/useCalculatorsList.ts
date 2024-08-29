import { watch } from 'vue'
import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useLocalizedRoute from './useLocalizedRoute'
import type { CalculatorObject, CalculatorRawEntry } from '@/data/calculators'
import calculators from '@/data/calculators'

export default function useCalculatorsList(): Ref<CalculatorObject[]> {
    const { t, locale } = useI18n()

    function translateCalculatorObject(calculator: CalculatorObject): CalculatorObject {
        return {
            ...calculator,
            title: t(calculator.title),
            tags: calculator.tags.map((tag) => t(tag)),
            description: t(calculator.description)
        }
    }

    function buildCalculatorObject(calculator: CalculatorRawEntry): CalculatorObject {
        const _c = typeof calculator === 'string' ? { id: calculator } : calculator

        return {
            id: _c.id,
            title: _c.title ?? `calculators.${_c.id}.title`,
            route: _c.route ?? useLocalizedRoute(`calculators.${_c.id}`),
            tags: _c.tags ?? [],
            description: _c.description ?? `calculators.${_c.id}.description`
        }
    }

    function buildList(): CalculatorObject[] {
        return calculators
            .filter((c) => !c.disabled)
            .map((c) => translateCalculatorObject(buildCalculatorObject(c)))
    }

    const list = ref(buildList())

    watch(locale, () => (list.value = buildList()))

    return list
}
