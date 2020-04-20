import { Recipe } from "./models"
import { ingredientMap } from "./data"

/**
 * Given an array of available ingredients and all recipes, return an array of
 * recipe IDs which could be made given the ingredients at hand
 */
export function computeAvailableRecipes(
  ingredients: string[],
  allRecipes: Recipe[],
): string[] {
  let selectedIngredients = new Set(ingredients)
  let results = allRecipes
    .filter(r => r.items.every(i => selectedIngredients.has(i.ingredientId)))
    .map(r => r.id)
  return results
}

/**
 * Given an array of available ingredients and all recipes, return the ID of the
 * ingredient to buy which would maximize the increase in available recipes, or null
 * if all recipes are available
 */
export function computeNextIngredient(
  ingredients: string[],
  allRecipes: Recipe[],
): string[] | null {
  // Find each recipe that's one ingredient from being complete,
  // Add those to a map that keeps track of how many recipies would be doable with them
  const alreadySelectedIngredients = new Set(ingredients)
  const ingredientToNumRecipeMap = new Map()

  for (const recipe of allRecipes) {
    let hasExactlyOneMissingIngredient = false
    let missingIngredientId = ""

    // loop through each ingredient in the recipe
    for (const ingredient of recipe.items) {
      const ingredientId = ingredient.ingredientId

      // if the ingredient is not already selected
      // increase the number of possible recipes for this ingredient
      if (!alreadySelectedIngredients.has(ingredientId)) {
        // If we've already found a missing ingredient,
        // then this receipe has too many missing ingredients
        // So we will skip this one
        if (hasExactlyOneMissingIngredient) {
          hasExactlyOneMissingIngredient = false
          break
        }

        hasExactlyOneMissingIngredient = true
        missingIngredientId = ingredientId
      }
    }

    if (hasExactlyOneMissingIngredient) {
      // If there is exactly one missing, we'll add it to our map of possible recipes
      if (ingredientToNumRecipeMap.has(missingIngredientId)) {
        ingredientToNumRecipeMap.set(
          missingIngredientId,
          ingredientToNumRecipeMap.get(missingIngredientId) + 1,
        )
      } else {
        ingredientToNumRecipeMap.set(missingIngredientId, 1)
      }
    }
  }

  // Find the maximum number of matched recipes
  const valuesArray = [...ingredientToNumRecipeMap.values()]
  const bestCount = valuesArray.reduce(
    (max, value) => (value > max ? value : max),
    valuesArray[0],
  )

  // get all the ingredients that have that amount of matched recipes
  const bestIngredients = [...ingredientToNumRecipeMap.entries()]
    .filter(a => a[1] === bestCount)
    .map(a => ingredientMap.get(a[0])?.name ?? "")

  return bestIngredients
}
