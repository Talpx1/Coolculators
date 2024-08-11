import { computed, isRef, ref, type MaybeRef, type Ref } from 'vue'
import useBmiRanges from './useBmiRanges'

export default function useBmi(height: MaybeRef<number | null>, weight: MaybeRef<number | null>) {
    const _height = isRef(height) ? height : ref(height)
    const _weight = isRef(weight) ? weight : ref(weight)

    const bmi = computed(() => {
        if (!_height.value || !_weight.value) {
            return null
        }
        return _weight.value / Math.pow(_height.value, 2)
    })

    const range = computed(() => {
        if (!bmi.value) {
            return null
        }

        const ranges = useBmiRanges()

        return (
            ranges.value.find((range) => bmi.value! >= range.min && bmi.value! < range.max) ?? null
        )
    })

    return {
        bmi,
        range
    }
}
