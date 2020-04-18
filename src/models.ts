export interface Ingredient {
  id: string
  name: string
}

export interface Recipe<IngredientId extends string> {
  id: string
  name: string
  items: RecipeItems<IngredientId>
}

export type RecipeItems<IngredientId extends string> = {
  [K in IngredientId]?: RecipeItem
}

export interface RecipeItem {
  parts?: number
}
