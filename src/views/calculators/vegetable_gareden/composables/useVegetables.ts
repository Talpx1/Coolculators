import { useI18n } from 'vue-i18n'
import useSeasons from './useSeasons'
import useSoils from './useSoils'
import useFertilizers from './useFertilizers'
import useVegetableTypes from './useVegetableTypes'
import useGrowingTips from './useGrowingTips'
import useDiseasesSignsAndSymptoms from './useDiseasesSignsAndSymptoms'
import useDiseasesPreventions from './useDiseasesPreventions'
import useDiseasesTreatments from './useDiseasesTreatments'
import { computed } from 'vue'

type Irrigation = {
    frequency: { amount: number; time_period: string }
    quantity_liters: number
}

type Diseases = {
    signs_and_symptoms: string[]
    prevention: string[]
    treatment: string[]
}

export type Vegetable = {
    id: string
    name: string
    type: string
    space_required_cm2: number
    irrigation: Irrigation
    suitable_fertilizers: string[]
    suitable_soils: string[]
    cost: Record<string, number>
    yield_kg_per_plant: number
    suitable_seasons: string[]
    growing_tips: string[]
    diseases: Diseases
}

export default function useVegetables() {
    const { t } = useI18n()

    const VEGETABLE_TYPES = useVegetableTypes()
    const FREQUENCY_TIME_PERIODS = {
        per_week: t('calculators.vegetable_garden.messages.time_periods.per_week')
    }
    const FERTILIZERS = useFertilizers()
    const SOILS = useSoils()
    const SEASONS = useSeasons()
    const GROWING_TIPS = useGrowingTips()
    const DISEASES_SIGNS_AND_SYMPTOMS = useDiseasesSignsAndSymptoms()
    const DISEASES_PREVENTIONS = useDiseasesPreventions()
    const DISEASES_TREATMENTS = useDiseasesTreatments()

    return computed(() => [
        {
            id: 'lettuce',
            name: t('calculators.vegetable_garden.messages.vegetables.lettuce'),
            type: VEGETABLE_TYPES.value.leafy_vegetable,
            space_required_cm2: 400,
            irrigation: {
                frequency: {
                    amount: 3,
                    time_period: FREQUENCY_TIME_PERIODS.per_week
                },
                quantity_liters: 0.5
            },
            suitable_fertilizers: [FERTILIZERS.value.compost, FERTILIZERS.value.organic_nitrogen],
            suitable_soils: [SOILS.value.loamy_soil, SOILS.value.well_drained_soil],
            cost: {
                fr: 1.5,
                de: 1.3,
                it: 1.2,
                nl: 1.4,
                es: 1.25,
                us: 1.0,
                uk: 1.1
            },
            yield_kg_per_plant: 0.2,
            suitable_seasons: [SEASONS.value.spring, SEASONS.value.fall],
            growing_tips: [
                GROWING_TIPS.value.plant_in_cool_weather,
                GROWING_TIPS.value.keep_soil_consistently_moist
            ],
            diseases: {
                signs_and_symptoms: [
                    DISEASES_SIGNS_AND_SYMPTOMS.value.yellowing_leaves,
                    DISEASES_SIGNS_AND_SYMPTOMS.value.stunted_growth
                ],
                prevention: [
                    DISEASES_PREVENTIONS.value.use_disease_resistant_varieties,
                    DISEASES_PREVENTIONS.value.rotate_crops
                ],
                treatment: [
                    DISEASES_TREATMENTS.value.apply_organic_fungicide,
                    DISEASES_TREATMENTS.value.remove_affected_plants
                ]
            }
        },
        {
            id: 'spinach',
            name: t('calculators.vegetable_garden.messages.vegetables.spinach'),
            type: VEGETABLE_TYPES.value.leafy_vegetable,
            space_required_cm2: 300,
            irrigation: {
                frequency: {
                    amount: 2,
                    time_period: FREQUENCY_TIME_PERIODS.per_week
                },
                quantity_liters: 0.4
            },
            suitable_fertilizers: [
                FERTILIZERS.value.organic_compost,
                FERTILIZERS.value.nitrogen_rich_fertilizer
            ],
            suitable_soils: [SOILS.value.well_drained_soil, SOILS.value.loamy_soil],
            cost: {
                fr: 1.8,
                de: 1.6,
                it: 1.5,
                nl: 1.7,
                es: 1.55,
                us: 1.2,
                uk: 1.3
            },
            yield_kg_per_plant: 0.1,
            suitable_seasons: [SEASONS.value.spring, SEASONS.value.fall],
            growing_tips: [
                GROWING_TIPS.value.avoid_planting_in_hot_weather,
                GROWING_TIPS.value.keep_soil_consistently_moist
            ],
            diseases: {
                signs_and_symptoms: [
                    DISEASES_SIGNS_AND_SYMPTOMS.value.yellowing_leaves,
                    DISEASES_SIGNS_AND_SYMPTOMS.value.downy_mildew
                ],
                prevention: [
                    DISEASES_PREVENTIONS.value.ensure_proper_spacing,
                    DISEASES_PREVENTIONS.value.use_disease_resistant_seeds
                ],
                treatment: [
                    DISEASES_TREATMENTS.value.apply_fungicide,
                    DISEASES_TREATMENTS.value.remove_infected_leaves
                ]
            }
        },
        {
            id: 'tomato',
            name: t('calculators.vegetable_garden.messages.vegetables.tomato'),
            type: VEGETABLE_TYPES.value.fruit_vegetable,
            space_required_cm2: 2500,
            irrigation: {
                frequency: {
                    amount: 4,
                    time_period: FREQUENCY_TIME_PERIODS.per_week
                },
                quantity_liters: 1.5
            },
            suitable_fertilizers: [
                FERTILIZERS.value.balanced_fertilizer,
                FERTILIZERS.value.compost
            ],
            suitable_soils: [SOILS.value.well_drained_soil, SOILS.value.slightly_acidic_soil],
            cost: {
                fr: 2.5,
                de: 2.7,
                it: 2.3,
                nl: 2.6,
                es: 2.4,
                us: 2.0,
                uk: 2.2
            },
            yield_kg_per_plant: 4.0,
            suitable_seasons: [SEASONS.value.summer, SEASONS.value.late_spring],
            growing_tips: [
                GROWING_TIPS.value.support_with_stakes,
                GROWING_TIPS.value.prune_suckers_for_better_yield
            ],
            diseases: {
                signs_and_symptoms: [
                    DISEASES_SIGNS_AND_SYMPTOMS.value.wilting_leaves,
                    DISEASES_SIGNS_AND_SYMPTOMS.value.spots_on_fruit
                ],
                prevention: [
                    DISEASES_PREVENTIONS.value.ensure_good_air_circulation,
                    DISEASES_PREVENTIONS.value.avoid_overhead_watering
                ],
                treatment: [
                    DISEASES_TREATMENTS.value.apply_copper_fungicide,
                    DISEASES_TREATMENTS.value.remove_diseased_parts
                ]
            }
        },
        {
            id: 'cucumber',
            name: t('calculators.vegetable_garden.messages.vegetables.cucumber'),
            type: VEGETABLE_TYPES.value.fruit_vegetable,
            space_required_cm2: 100,
            irrigation: {
                frequency: {
                    amount: 3,
                    time_period: FREQUENCY_TIME_PERIODS.per_week
                },
                quantity_liters: 1.2
            },
            suitable_fertilizers: [
                FERTILIZERS.value.potash_rich_fertilizer,
                FERTILIZERS.value.compost
            ],
            suitable_soils: [SOILS.value.well_drained_soil, SOILS.value.sandy_loam],
            cost: {
                fr: 2.0,
                de: 2.1,
                it: 1.9,
                nl: 2.05,
                es: 1.95,
                us: 1.8,
                uk: 1.85
            },
            yield_kg_per_plant: 3.5,
            suitable_seasons: [SEASONS.value.summer],
            growing_tips: [
                GROWING_TIPS.value.mulch_to_retain_moisture,
                GROWING_TIPS.value.train_vines_on_a_trellis
            ],
            diseases: {
                signs_and_symptoms: [
                    DISEASES_SIGNS_AND_SYMPTOMS.value.yellowing_leaves,
                    DISEASES_SIGNS_AND_SYMPTOMS.value.powdery_mildew
                ],
                prevention: [
                    DISEASES_PREVENTIONS.value.rotate_crops,
                    DISEASES_PREVENTIONS.value.water_at_the_base_of_the_plant
                ],
                treatment: [
                    DISEASES_TREATMENTS.value.apply_neem_oil,
                    DISEASES_TREATMENTS.value.remove_infected_parts
                ]
            }
        },
        {
            id: 'carrot',
            name: t('calculators.vegetable_garden.messages.vegetables.carrot'),
            type: VEGETABLE_TYPES.value.root_vegetable,
            space_required_cm2: 100,
            irrigation: {
                frequency: {
                    amount: 2,
                    time_period: FREQUENCY_TIME_PERIODS.per_week
                },
                quantity_liters: 0.3
            },
            suitable_fertilizers: [
                FERTILIZERS.value.potash_rich_fertilizer,
                FERTILIZERS.value.compost
            ],
            suitable_soils: [SOILS.value.sandy_soil, SOILS.value.well_drained_soil],
            cost: {
                fr: 1.2,
                de: 1.1,
                it: 1.0,
                nl: 1.15,
                es: 1.05,
                us: 0.9,
                uk: 1.0
            },
            yield_kg_per_plant: 0.1,
            suitable_seasons: [SEASONS.value.spring, SEASONS.value.fall],
            growing_tips: [
                GROWING_TIPS.value.thin_seedlings_to_prevent_crowding,
                GROWING_TIPS.value.ensure_deep_loose_soil
            ],
            diseases: {
                signs_and_symptoms: [
                    DISEASES_SIGNS_AND_SYMPTOMS.value.forked_roots,
                    DISEASES_SIGNS_AND_SYMPTOMS.value.stunted_growth
                ],
                prevention: [
                    DISEASES_PREVENTIONS.value.avoid_soil_compaction,
                    DISEASES_PREVENTIONS.value.rotate_crops
                ],
                treatment: [
                    DISEASES_TREATMENTS.value.use_organic_nematode_control,
                    DISEASES_TREATMENTS.value.remove_affected_plants
                ]
            }
        },
        {
            id: 'radish',
            name: t('calculators.vegetable_garden.messages.vegetables.radish'),
            type: VEGETABLE_TYPES.value.root_vegetable,
            space_required_cm2: 50,
            irrigation: {
                frequency: {
                    amount: 3,
                    time_period: FREQUENCY_TIME_PERIODS.per_week
                },
                quantity_liters: 0.2
            },
            suitable_fertilizers: [
                FERTILIZERS.value.balanced_fertilizer,
                FERTILIZERS.value.compost
            ],
            suitable_soils: [SOILS.value.well_drained_soil, SOILS.value.loamy_soil],
            cost: {
                fr: 1.0,
                de: 1.05,
                it: 0.9,
                nl: 1.1,
                es: 0.95,
                us: 0.85,
                uk: 0.9
            },
            yield_kg_per_plant: 0.05,
            suitable_seasons: [SEASONS.value.spring, SEASONS.value.fall],
            growing_tips: [
                GROWING_TIPS.value.harvest_early_to_avoid_bitterness,
                GROWING_TIPS.value.ensure_consistent_moisture
            ],
            diseases: {
                signs_and_symptoms: [
                    DISEASES_SIGNS_AND_SYMPTOMS.value.yellowing_leaves,
                    DISEASES_SIGNS_AND_SYMPTOMS.value.root_maggots
                ],
                prevention: [
                    DISEASES_PREVENTIONS.value.use_row_covers,
                    DISEASES_PREVENTIONS.value.rotate_crops
                ],
                treatment: [
                    DISEASES_TREATMENTS.value.apply_insecticidal_soap,
                    DISEASES_TREATMENTS.value.remove_and_destroy_infected_plants
                ]
            }
        },
        {
            id: 'potato',
            name: t('calculators.vegetable_garden.messages.vegetables.potato'),
            type: VEGETABLE_TYPES.value.root_vegetable,
            space_required_cm2: 3000,
            irrigation: {
                frequency: {
                    amount: 3,
                    time_period: FREQUENCY_TIME_PERIODS.per_week
                },
                quantity_liters: 2.0
            },
            suitable_fertilizers: [
                FERTILIZERS.value.balanced_fertilizer,
                FERTILIZERS.value.compost
            ],
            suitable_soils: [SOILS.value.loamy_soil, SOILS.value.well_drained_soil],
            cost: {
                fr: 2.0,
                de: 2.1,
                it: 1.9,
                nl: 2.05,
                es: 1.95,
                us: 1.8,
                uk: 1.85
            },
            yield_kg_per_plant: 2.0,
            suitable_seasons: [SEASONS.value.spring, SEASONS.value.summer],
            growing_tips: [
                GROWING_TIPS.value.hill_up_soil_around_plants,
                GROWING_TIPS.value.avoid_waterlogged_soil
            ],
            diseases: {
                signs_and_symptoms: [
                    DISEASES_SIGNS_AND_SYMPTOMS.value.black_spots_on_leaves,
                    DISEASES_SIGNS_AND_SYMPTOMS.value.wilting
                ],
                prevention: [
                    DISEASES_PREVENTIONS.value.rotate_crops,
                    DISEASES_PREVENTIONS.value.use_certified_disease_free_seeds
                ],
                treatment: [
                    DISEASES_TREATMENTS.value.apply_organic_fungicide,
                    DISEASES_TREATMENTS.value.remove_and_destroy_infected_plants
                ]
            }
        }
    ])
}
