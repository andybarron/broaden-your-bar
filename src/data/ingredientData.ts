import data from "./ingredients.json"

interface IngredientData {
  [id: string]: {
    name?: string
    namePlural?: string
    isGarnish?: boolean // TODO garnish type
    unit?: string
    unitPlural?: string
  }
}

const parseIngredientData = () => {
  const ingredientData: IngredientData = {}
  data.forEach(ingredient => {
    ingredientData[ingredient.id] = {
      name: ingredient.name,
      namePlural: ingredient.namePlural,
      isGarnish: ingredient.isGarnish,
      unit: ingredient.unit,
      unitPlural: ingredient.unitPlural,
    }
  })

  console.log(ingredientData)

  return ingredientData
}

/**
 * Ingredient list input data
 */
export const ingredientData: IngredientData = parseIngredientData()
