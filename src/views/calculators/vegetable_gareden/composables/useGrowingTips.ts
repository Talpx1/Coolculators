import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useGrowingTips() {
    const { t } = useI18n()

    const growing_tips = computed(() => ({
        plant_in_cool_weather: t(
            'calculators.vegetable_garden.messages.growing_tips.plant_in_cool_weather'
        ),
        keep_soil_consistently_moist: t(
            'calculators.vegetable_garden.messages.growing_tips.keep_soil_consistently_moist'
        ),
        avoid_planting_in_hot_weather: t(
            'calculators.vegetable_garden.messages.growing_tips.avoid_planting_in_hot_weather'
        ),
        support_with_stakes: t(
            'calculators.vegetable_garden.messages.growing_tips.support_with_stakes'
        ),
        prune_suckers_for_better_yield: t(
            'calculators.vegetable_garden.messages.growing_tips.prune_suckers_for_better_yield'
        ),
        mulch_to_retain_moisture: t(
            'calculators.vegetable_garden.messages.growing_tips.mulch_to_retain_moisture'
        ),
        train_vines_on_a_trellis: t(
            'calculators.vegetable_garden.messages.growing_tips.train_vines_on_a_trellis'
        ),
        thin_seedlings_to_prevent_crowding: t(
            'calculators.vegetable_garden.messages.growing_tips.thin_seedlings_to_prevent_crowding'
        ),
        ensure_deep_loose_soil: t(
            'calculators.vegetable_garden.messages.growing_tips.ensure_deep_loose_soil'
        ),
        harvest_early_to_avoid_bitterness: t(
            'calculators.vegetable_garden.messages.growing_tips.harvest_early_to_avoid_bitterness'
        ),
        ensure_consistent_moisture: t(
            'calculators.vegetable_garden.messages.growing_tips.ensure_consistent_moisture'
        ),
        hill_up_soil_around_plants: t(
            'calculators.vegetable_garden.messages.growing_tips.hill_up_soil_around_plants'
        ),
        avoid_waterlogged_soil: t(
            'calculators.vegetable_garden.messages.growing_tips.avoid_waterlogged_soil'
        ),
        plant_in_full_sun: t(
            'calculators.vegetable_garden.messages.growing_tips.plant_in_full_sun'
        ),
        harvest_when_small_for_best_flavor: t(
            'calculators.vegetable_garden.messages.growing_tips.harvest_when_small_for_best_flavor'
        ),
        start_seeds_indoors: t(
            'calculators.vegetable_garden.messages.growing_tips.start_seeds_indoors'
        ),
        protect_heads_from_direct_sunlight: t(
            'calculators.vegetable_garden.messages.growing_tips.protect_heads_from_direct_sunlight'
        ),
        avoid_excessive_nitrogen: t(
            'calculators.vegetable_garden.messages.growing_tips.avoid_excessive_nitrogen'
        )
    }))

    return growing_tips
}
