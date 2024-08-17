import { ref } from 'vue'

export const FOOD_CATEGORIES = [
    'meat',
    'fruits',
    'vegetables',
    'dairy',
    'seafood',
    'grains',
    'sweets_and_snacks'
] as const

export type FoodCategory = (typeof FOOD_CATEGORIES)[number]

export type FoodCategoryData = {
    bought_amount: number
    wasted_amount: number
    paper_packaging_amount: number
    plastic_packaging_amount: number
}

export type UserFoodData = Record<FoodCategory, FoodCategoryData>

export default function useNewFoodCategoryDataObject() {
    return ref<UserFoodData>({
        meat: {
            bought_amount: 0,
            wasted_amount: 0,
            paper_packaging_amount: 0,
            plastic_packaging_amount: 0
        },
        fruits: {
            bought_amount: 0,
            wasted_amount: 0,
            paper_packaging_amount: 0,
            plastic_packaging_amount: 0
        },
        vegetables: {
            bought_amount: 0,
            wasted_amount: 0,
            paper_packaging_amount: 0,
            plastic_packaging_amount: 0
        },
        dairy: {
            bought_amount: 0,
            wasted_amount: 0,
            paper_packaging_amount: 0,
            plastic_packaging_amount: 0
        },
        seafood: {
            bought_amount: 0,
            wasted_amount: 0,
            paper_packaging_amount: 0,
            plastic_packaging_amount: 0
        },
        grains: {
            bought_amount: 0,
            wasted_amount: 0,
            paper_packaging_amount: 0,
            plastic_packaging_amount: 0
        },
        sweets_and_snacks: {
            bought_amount: 0,
            wasted_amount: 0,
            paper_packaging_amount: 0,
            plastic_packaging_amount: 0
        }
    })
}
