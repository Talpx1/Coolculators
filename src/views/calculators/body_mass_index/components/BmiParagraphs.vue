<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'
import Card from 'primevue/card'

const { t } = useI18n()
</script>

<template>
    <div>
        <SecondaryHeading>
            {{ t('calculators.body_mass_index.messages.what_bmi_is') }}
        </SecondaryHeading>
        <TextParagraph>
            {{ t('calculators.body_mass_index.messages.what_bmi_is_description') }}
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>
            {{ t('calculators.body_mass_index.messages.low_or_high_bmi_risks') }}
        </SecondaryHeading>
        <TextParagraph>
            {{ t('calculators.body_mass_index.messages.low_or_high_bmi_risks_description') }}
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>
            {{ t('calculators.body_mass_index.messages.how_to_calculate_bmi') }}
        </SecondaryHeading>
        <TextParagraph>
            {{ t('calculators.body_mass_index.messages.how_to_calculate_bmi_description.intro') }}
            <br /><br />
            <ol class="list-inside list-decimal">
                <li>
                    <b>
                        {{
                            t(
                                'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_1_intro'
                            )
                        }}
                    </b>
                    {{
                        t(
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_1'
                        )
                    }}
                </li>
                <li>
                    <b>
                        {{
                            t(
                                'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_2_intro'
                            )
                        }}
                    </b>
                    {{
                        t(
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_2'
                        )
                    }}
                </li>
                <li>
                    <b>
                        {{
                            t(
                                'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_3_intro'
                            )
                        }}
                    </b>
                    {{
                        t(
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_3'
                        )
                    }}
                </li>
            </ol>
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>
            {{ t('calculators.body_mass_index.messages.what_bmi_does_not_take_into_account') }}
        </SecondaryHeading>
        <TextParagraph>
            {{
                t(
                    'calculators.body_mass_index.messages.what_bmi_does_not_take_into_account_description'
                )
            }}
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>
            {{ t('calculators.body_mass_index.messages.bmi_difference_between_man_and_woman') }}
        </SecondaryHeading>
        <TextParagraph>
            {{
                t(
                    'calculators.body_mass_index.messages.bmi_difference_between_man_and_woman_description'
                )
            }}
        </TextParagraph>
    </div>

    <div>
        <SecondaryHeading>
            {{ t('calculators.body_mass_index.messages.bmi_in_children') }}
        </SecondaryHeading>
        <TextParagraph>
            {{ t('calculators.body_mass_index.messages.bmi_in_children_description') }}
        </TextParagraph>
    </div>
</template>
