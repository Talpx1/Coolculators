<script setup lang="ts">
import TextualLink from '@/components/ui/TextualLink.vue'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import useFlagEmoji from '@/composables/useFlagEmoji'
import Card from 'primevue/card'
import { useI18n } from 'vue-i18n'

const { t, n } = useI18n()

const countriesFoodWasteData = [
    {
        name: 'china',
        flag_emoji: useFlagEmoji().fromCode('CN'),
        kg_per_capita: 76,
        annual_tons_in_millions: 108.7
    },
    {
        name: 'india',
        flag_emoji: useFlagEmoji().fromCode('IN'),
        kg_per_capita: 55,
        annual_tons_in_millions: 78.2
    },
    {
        name: 'pakistan',
        flag_emoji: useFlagEmoji().fromCode('PK'),
        kg_per_capita: 130,
        annual_tons_in_millions: 30.8
    },
    {
        name: 'nigeria',
        flag_emoji: useFlagEmoji().fromCode('NG'),
        kg_per_capita: 113,
        annual_tons_in_millions: 24.8
    },
    {
        name: 'usa',
        flag_emoji: useFlagEmoji().fromCode('US'),
        kg_per_capita: 73,
        annual_tons_in_millions: 24.7
    },
    {
        name: 'brazil',
        flag_emoji: useFlagEmoji().fromCode('BR'),
        kg_per_capita: 94,
        annual_tons_in_millions: 20.3
    },
    {
        name: 'egypt',
        flag_emoji: useFlagEmoji().fromCode('EG'),
        kg_per_capita: 163,
        annual_tons_in_millions: 18.1
    },
    {
        name: 'indonesia',
        flag_emoji: useFlagEmoji().fromCode('ID'),
        kg_per_capita: 53,
        annual_tons_in_millions: 14.7
    },
    {
        name: 'bangladesh',
        flag_emoji: useFlagEmoji().fromCode('BD'),
        kg_per_capita: 82,
        annual_tons_in_millions: 14.1
    },
    {
        name: 'mexico',
        flag_emoji: useFlagEmoji().fromCode('MX'),
        kg_per_capita: 105,
        annual_tons_in_millions: 13.4
    },
    {
        name: 'maldives',
        flag_emoji: useFlagEmoji().fromCode('MV'),
        kg_per_capita: 207,
        annual_tons_in_millions: 0.1
    },
    {
        name: 'seychelles',
        flag_emoji: useFlagEmoji().fromCode('SC'),
        kg_per_capita: 183,
        annual_tons_in_millions: 0.02
    },
    {
        name: 'syria',
        flag_emoji: useFlagEmoji().fromCode('SY'),
        kg_per_capita: 172,
        annual_tons_in_millions: 3.8
    },
    {
        name: 'tunisia',
        flag_emoji: useFlagEmoji().fromCode('TN'),
        kg_per_capita: 172,
        annual_tons_in_millions: 2.1
    },
    {
        name: 'dominican_republic',
        flag_emoji: useFlagEmoji().fromCode('DO'),
        kg_per_capita: 160,
        annual_tons_in_millions: 1.8
    },
    {
        name: 'tanzania',
        flag_emoji: useFlagEmoji().fromCode('TZ'),
        kg_per_capita: 152,
        annual_tons_in_millions: 10
    },
    {
        name: 'iraq',
        flag_emoji: useFlagEmoji().fromCode('IQ'),
        kg_per_capita: 143,
        annual_tons_in_millions: 6.4
    },
    {
        name: 'rwanda',
        flag_emoji: useFlagEmoji().fromCode('RW'),
        kg_per_capita: 141,
        annual_tons_in_millions: 1.9
    },
    {
        name: 'vanuatu',
        flag_emoji: useFlagEmoji().fromCode('VU'),
        kg_per_capita: 141,
        annual_tons_in_millions: 0.05
    }
]

const top10CountryByFoodWastePerCapita = countriesFoodWasteData
    .sort((c1, c2) => {
        if (c1.kg_per_capita > c2.kg_per_capita) {
            return -1
        }
        if (c1.kg_per_capita < c2.kg_per_capita) {
            return 1
        }
        return 0
    })
    .slice(0, 10)

const top10CountryByFoodWastePerYear = countriesFoodWasteData
    .sort((c1, c2) => {
        if (c1.annual_tons_in_millions > c2.annual_tons_in_millions) {
            return -1
        }
        if (c1.annual_tons_in_millions < c2.annual_tons_in_millions) {
            return 1
        }
        return 0
    })
    .slice(0, 10)
</script>

<template>
    <div>
        <SecondaryHeading>{{
            t('calculators.food_waste.messages.top_10_country_by_waste_per_capita')
        }}</SecondaryHeading>
        <Card>
            <template #content>
                <div class="grid grid-cols-2 gap-y-4">
                    <header class="contents font-bold">
                        <div>{{ t('calculators.shared_messages.country') }}</div>
                        <div>
                            {{ t('calculators.food_waste.messages.food_waste_in_kg_per_capita') }}
                        </div>
                    </header>
                    <div
                        v-for="entry in top10CountryByFoodWastePerCapita"
                        :key="entry.name"
                        class="contents"
                    >
                        <div>{{ entry.flag_emoji }} {{ t(`countries.${entry.name}`) }}</div>
                        <div>{{ n(entry.kg_per_capita) }}</div>
                    </div>
                </div>
            </template>
        </Card>
        <p class="mt-2">
            {{ t('calculators.shared_messages.source') }}:
            <TextualLink
                to="https://worldpopulationreview.com/country-rankings/food-waste-by-country"
            >
                https://worldpopulationreview.com/country-rankings/food-waste-by-country
            </TextualLink>
        </p>
    </div>

    <div>
        <SecondaryHeading>{{
            t('calculators.food_waste.messages.top_10_country_by_annual_food_waste')
        }}</SecondaryHeading>
        <Card>
            <template #content>
                <div class="grid grid-cols-2 gap-y-4">
                    <header class="contents font-bold">
                        <div>{{ t('calculators.shared_messages.country') }}</div>
                        <div>
                            {{ t('calculators.food_waste.messages.annual_food_waste_in_tons') }}
                        </div>
                    </header>
                    <div
                        v-for="entry in top10CountryByFoodWastePerYear"
                        :key="entry.name"
                        class="contents"
                    >
                        <div>{{ entry.flag_emoji }} {{ t(`countries.${entry.name}`) }}</div>
                        <div>{{ n(entry.annual_tons_in_millions) }}M</div>
                    </div>
                </div>
            </template>
        </Card>
        <p class="mt-2">
            {{ t('calculators.shared_messages.source') }}:
            <TextualLink
                to="https://worldpopulationreview.com/country-rankings/food-waste-by-country"
            >
                https://worldpopulationreview.com/country-rankings/food-waste-by-country
            </TextualLink>
        </p>
    </div>
</template>
