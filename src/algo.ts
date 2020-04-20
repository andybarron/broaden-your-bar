import { Recipe } from "./models"
import { ingredientMap } from "./data"

/**
 * Given an array of available ingredients and all recipes, return an array of
 * recipe IDs which could be made given the ingredients at hand
 */
export function computeAvailableRecipes(ingredients: string[], allRecipes: Recipe[]): string[] {
  let set = new Set(ingredients)
  let results = []

  for (const recipe of allRecipes) {
    let shouldAdd = true

    for (const ingredient of recipe.items) {
      if (!set.has(ingredient.ingredientId)) {
        shouldAdd = false
        break
      }
    }

    if (shouldAdd) {
      results.push(recipe.id)
    }
  }

  return results
}

/**
 * Given an array of available ingredients and all recipes, return the ID of the
 * ingredient to buy which would maximize the increase in available recipes, or null
 * if all recipes are available
 */
export function computeNextIngredient(ingredients: string[], allRecipes: Recipe[]): string[] | null {
  // Find each recipe that's one ingredient from being complete,
  // Add those to a map that keeps track of how many recipies would be doable with them
  const alreadySelectedIngredients = new Set(ingredients)
  const missingIngredientToNumPossibleRecipeMap = new Map()

  for (const recipe of allRecipes) {
    let hasExactlyOneMissingIngredient = false
    let missingIngredientId = ""

    // loop through each ingredient in the recipe
    for (const ingredient of recipe.items) {
      const ingredientId = ingredient.ingredientId

      // if the ingredient is not already in our cabinet, increase the number of possible
      // recipes for this ingredient
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
      if (missingIngredientToNumPossibleRecipeMap.has(missingIngredientId)) {
        missingIngredientToNumPossibleRecipeMap.set(
          missingIngredientId,
          missingIngredientToNumPossibleRecipeMap.get(missingIngredientId) + 1,
        )
      } else {
        missingIngredientToNumPossibleRecipeMap.set(missingIngredientId, 1)
      }
    }
  }

  // Find which ingredient in map has the most available recipes
  let bestIngredients = []
  let currBestCountNewRecipies = -1

  for (const [ingredientId, numRecipes] of missingIngredientToNumPossibleRecipeMap) {
    const ingredient = ingredientMap.get(ingredientId)
    var itemName =
      ingredient != null ? (Boolean(ingredient.name) ? ingredient.name : ingredientId) : "wtf are you doing"

    // If we've found an ingredient with more matches, reset list of best ingredients and add this one
    if (numRecipes > currBestCountNewRecipies) {
      currBestCountNewRecipies = numRecipes
      bestIngredients = []
      bestIngredients.push(itemName)
    } else if (numRecipes === currBestCountNewRecipies) {
      bestIngredients.push(itemName)
    }
  }

  return bestIngredients
}
