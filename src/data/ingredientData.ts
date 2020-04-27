import data from "./ingredients.json"

interface IngredientData {
  [id: string]: {
    name?: string
    namePlural?: string
    isGarnish?: boolean // TODO garnish type
  }
}

const parseIngredientData = () => {
  const ingredientData: IngredientData = {}
  data.forEach(ingredient => {
    ingredientData[ingredient.id] = {
      name: ingredient.name,
      namePlural: ingredient.namePlural ? ingredient.namePlural : undefined,
      isGarnish: ingredient.isGarnish ? ingredient.isGarnish : undefined,
    }
  })

  return ingredientData
}

/**
 * Ingredient list input data
 */
export const ingredientData: IngredientData = parseIngredientData()
