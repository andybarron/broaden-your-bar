export interface Ingredient {
  id: string
  name: string
  namePlural?: string
  isGarnish?: boolean
}

export interface Recipe {
  id: string
  name: string
  items: RecipeItem[]
  glass?: string
}

export interface RecipeItem {
  ingredientId: string
  parts: number
  extraInstructions?: string
}
