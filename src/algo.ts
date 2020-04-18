import { Recipe } from "./models"

/**
 * Given an array of available ingredients and all recipes, return an array of
 * recipe IDs which could be made given the ingredients at hand
 */
export function computeAvailableRecipes(
  ingredients: string[],
  allRecipes: Recipe[],
): string[] {
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
export function computeNextIngredient(
  ingredients: string[],
  allRecipes: Recipe[],
): string[] | null {
  // Find each recipe that's one ingredient from being complete,
  // Add those to a map that keeps track of how many recipies would be doable with them

  let set = new Set(ingredients)
  let map = new Map()

  for (const recipe of allRecipes) {
    var missingIngredient = null

    for (const ingredient of recipe.items) {
      if (!set.has(ingredient.ingredientId)) {
        if (missingIngredient === null) {
          missingIngredient = ingredient.ingredientId
        } else {
          missingIngredient = null
          break
        }
      }
    }

    if (missingIngredient !== null) {
      if (map.has(missingIngredient)) {
        map.set(missingIngredient, map.get(missingIngredient) + 1)
      } else {
        map.set(missingIngredient, 1)
      }
    }
  }

  // Find which ingredient in map has largest value

  let bestIngredients = []
  let currBestCountNewRecipies = -1

  for (let item of map.keys()) {
    if (map.get(item) > currBestCountNewRecipies) {
      currBestCountNewRecipies = map.get(item)
      bestIngredients = []
      bestIngredients.push(item)
    } else if (map.get(item) === currBestCountNewRecipies) {
      bestIngredients.push(item)
    }
  }

  return bestIngredients
}
