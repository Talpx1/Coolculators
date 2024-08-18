<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'
import Card from 'primevue/card'

const { t } = useI18n()

const calorieNeedTables = {
    sedentary_lifestyle: {
        '15 - 18': {
            man: 2000,
            woman: 2500
        },
        '19 - 24': {
            man: 1900,
            woman: 2500
        },
        '25 - 50': {
            man: 1900,
            woman: 2400
        },
        '51 - 64': {
            man: 1800,
            woman: 2200
        },
        '64+': {
            man: 1600,
            woman: 200
        }
    }
}
</script>

<template>
    <div>
        <SecondaryHeading>{{
            t('calculators.daily_calorie_needs.messages.what_bmr_is')
        }}</SecondaryHeading>
        <TextParagraph>
            {{ t('calculators.daily_calorie_needs.messages.what_bmr_is_description') }}
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>{{
            t('calculators.daily_calorie_needs.messages.what_daily_calorie_needs_is')
        }}</SecondaryHeading>
        <TextParagraph>
            {{
                t(
                    'calculators.daily_calorie_needs.messages.what_daily_calorie_needs_is_description'
                )
            }}
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading class="col-span-3">{{
            t(
                'calculators.daily_calorie_needs.messages.daily_calorie_need_for_sedentary_people_table'
            )
        }}</SecondaryHeading>
        <Card>
            <template #content>
                <div class="grid grid-cols-3 gap-y-4">
                    <header class="contents font-bold">
                        <div>{{ t('calculators.shared_messages.age') }}</div>
                        <div>{{ t('calculators.shared_messages.man') }}</div>
                        <div>{{ t('calculators.shared_messages.woman') }}</div>
                    </header>
                    <div
                        v-for="(calorieNeed, age) in calorieNeedTables.sedentary_lifestyle"
                        :key="age"
                        class="contents"
                    >
                        <div>{{ age }}</div>
                        <div>{{ calorieNeed.man }} kcal</div>
                        <div>{{ calorieNeed.woman }} kcal</div>
                    </div>
                </div>
            </template>
        </Card>
    </div>

    <div>
        <SecondaryHeading>{{
            t(
                'calculators.daily_calorie_needs.messages.purpose_of_knowing_your_daily_calorie_needs'
            )
        }}</SecondaryHeading>
        <TextParagraph>
            {{
                t(
                    'calculators.daily_calorie_needs.messages.purpose_of_knowing_your_daily_calorie_needs_description'
                )
            }}
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>{{
            t('calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs')
        }}</SecondaryHeading>
        <TextParagraph>
            {{
                t(
                    'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.intro'
                )
            }}<br /><br />

            <h3 class="font-bold">
                {{
                    t(
                        'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.for_men'
                    )
                }}
            </h3>
            <h4>
                {{
                    t(
                        'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.men_formula'
                    )
                }}
            </h4>

            <h3 class="font-bold">
                {{
                    t(
                        'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.for_women'
                    )
                }}
            </h3>
            <h4>
                {{
                    t(
                        'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.women_formula'
                    )
                }}
            </h4>
            <br />

            {{
                t(
                    'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.after_bmr_formula'
                )
            }}

            <div class="flex gap-1">
                <h3 class="font-bold">
                    {{ t('calculators.daily_calorie_needs.messages.sedentary_lifestyle') }}:
                </h3>
                <h4>
                    {{
                        t(
                            'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.sedentary_daily_calorie_needs_formula'
                        )
                    }}
                </h4>
            </div>
            <div class="flex gap-1">
                <h3 class="font-bold">
                    {{ t('calculators.daily_calorie_needs.messages.moderately_active_lifestyle') }}:
                </h3>
                <h4>
                    {{
                        t(
                            'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.moderately_active_daily_calorie_needs_formula'
                        )
                    }}
                </h4>
            </div>
            <div class="flex gap-1">
                <h3 class="font-bold">
                    {{ t('calculators.daily_calorie_needs.messages.active_lifestyle') }}:
                </h3>
                <h4>
                    {{
                        t(
                            'calculators.daily_calorie_needs.messages.how_to_calculate_your_daily_calorie_needs_description.active_daily_calorie_needs_formula'
                        )
                    }}
                </h4>
            </div>
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>{{
            t(
                'calculators.daily_calorie_needs.messages.why_is_it_important_to_know_your_daily_calorie_needs'
            )
        }}</SecondaryHeading>
        <TextParagraph>
            {{
                t(
                    'calculators.daily_calorie_needs.messages.why_is_it_important_to_know_your_daily_calorie_needs_description'
                )
            }}
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>{{
            t('calculators.daily_calorie_needs.messages.differences_between_bmr_formulas')
        }}</SecondaryHeading>
        <TextParagraph>
            {{
                t(
                    'calculators.daily_calorie_needs.messages.differences_between_bmr_formulas_description'
                )
            }}
        </TextParagraph>
    </div>
</template>
