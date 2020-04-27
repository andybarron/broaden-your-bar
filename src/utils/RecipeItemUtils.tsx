import { ingredientMap } from "../data"
import { RecipeItem, Ingredient } from "../models"

export function printRecipeItem(
  recipeItem: RecipeItem,
  customIngredients?: Ingredient[],
) {
  const ingredient = customIngredients
    ? customIngredients.filter(i => i.id === recipeItem.ingredientId)[0]
    : ingredientMap.get(recipeItem.ingredientId)!
  const displayName =
    recipeItem.parts > 1
      ? ingredient.namePlural ?? ingredient.name
      : ingredient.name
  const garnishInfo = ingredient.isGarnish
    ? `${recipeItem.extraInstructions} as garnish`
    : ""

  const partsString = ingredient.isGarnish
    ? ""
    : recipeItem.parts > 1
    ? "parts"
    : "part"
  const partsInfo =
    recipeItem.parts > 0 ? `${recipeItem.parts} ${partsString}` : ""

  return `${partsInfo} ${displayName} ${garnishInfo}`
}
