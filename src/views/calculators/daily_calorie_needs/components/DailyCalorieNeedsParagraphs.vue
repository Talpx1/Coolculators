<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'

const { t } = useI18n()
</script>

<template>
    <div class="flex flex-col">
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

    <div class="flex flex-col">
        <SecondaryHeading>{{
            t('calculators.daily_calorie_needs.messages.what_bmr_is')
        }}</SecondaryHeading>
        <TextParagraph>
            {{ t('calculators.daily_calorie_needs.messages.what_bmr_is_description') }}
        </TextParagraph>
    </div>

    <div class="flex flex-col">
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

    <div class="flex flex-col">
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

    <div class="flex flex-col">
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
</template>
