import { IngredientId } from "./data"
import { Recipe } from "./models"

/**
 * Given an array of available ingredients and all recipes, return an array of
 * recipe IDs which could be made given the ingredients at hand
 */
export function computeAvailableRecipes(
  ingredients: IngredientId[],
  allRecipes: Recipe<IngredientId>[],
): string[] {
  // TODO
  return []
}

/**
 * Given an array of available ingredients and all recipes, return the ID of the
 * ingredient to buy which would maximize the increase in available recipes, or null
 * if all recipes are available
 */
export function computeNextIngredient(
  ingredients: IngredientId[],
  allRecipes: Recipe<IngredientId>[],
): IngredientId | null {
  // TODO: implement
  return null
}
