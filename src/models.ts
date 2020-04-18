export interface Ingredient {
  id: string
  name: string
}

export interface Recipe {
  id: string
  name: string
  items: RecipeItem[]
}

export interface RecipeItem {
  ingredientId: string
  parts: number
}
