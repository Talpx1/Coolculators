<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SecondaryHeading from '@/components/ui/typography/SecondaryHeading.vue'
import TextParagraph from '@/components/ui/typography/TextParagraph.vue'
import TranslatableParagraphBlock from '@/components/i18n/TranslatableParagraphBlock.vue'

const { t } = useI18n()
</script>

<template>
    <TranslatableParagraphBlock title-keypath="calculators.body_mass_index.messages.what_bmi_is" />

    <TranslatableParagraphBlock
        title-keypath="calculators.body_mass_index.messages.low_or_high_bmi_risks"
    />

    <div>
        <SecondaryHeading v-t="'calculators.body_mass_index.messages.how_to_calculate_bmi'" />
        <TextParagraph>
            {{ t('calculators.body_mass_index.messages.how_to_calculate_bmi_description.intro') }}
            <br /><br />
            <ol class="list-inside list-decimal">
                <li>
                    <b
                        v-t="
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_1_intro'
                        "
                    />
                    {{
                        t(
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_1'
                        )
                    }}
                </li>
                <li>
                    <b
                        v-t="
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_2_intro'
                        "
                    />
                    {{
                        t(
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_2'
                        )
                    }}
                </li>
                <li>
                    <b
                        v-t="
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_3_intro'
                        "
                    />
                    {{
                        t(
                            'calculators.body_mass_index.messages.how_to_calculate_bmi_description.step_3'
                        )
                    }}
                </li>
            </ol>
        </TextParagraph>
    </div>

    <TranslatableParagraphBlock
        title-keypath="calculators.body_mass_index.messages.what_bmi_does_not_take_into_account"
    />

    <TranslatableParagraphBlock
        title-keypath="calculators.body_mass_index.messages.bmi_difference_between_man_and_woman"
    />

    <TranslatableParagraphBlock
        title-keypath="calculators.body_mass_index.messages.bmi_in_children"
    />
</template>
