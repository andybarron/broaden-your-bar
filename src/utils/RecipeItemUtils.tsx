import { ingredientMap } from "../data"
import { RecipeItem, Ingredient } from "../models"

export function printRecipeItem(
  recipeItem: RecipeItem,
  customIngredients?: Ingredient[],
) {
  const ingredient = customIngredients
    ? customIngredients.filter(i => i.id === recipeItem.ingredientId)[0]
    : ingredientMap.get(recipeItem.ingredientId)!

  const unitsString = ingredient.isGarnish
    ? ""
    : recipeItem.parts > 1
    ? ingredient.unitPlural ?? "parts"
    : ingredient.unit ?? "part"

  const partsInfo =
    recipeItem.parts > 0 ? `${recipeItem.parts} ${unitsString}` : ""

  const displayName =
    recipeItem.parts > 1
      ? ingredient.namePlural ?? ingredient.name
      : ingredient.name

  const extraInstructions = recipeItem.extraInstructions ?? ""

  const garnishInfo = ingredient.isGarnish ? "as garnish" : ""

  return `${partsInfo} ${displayName} ${extraInstructions} ${garnishInfo}`
    .trim() // remove trailing whitespace
    .replace(/\s+/g, " ") // remove multiple inner spaces
}
