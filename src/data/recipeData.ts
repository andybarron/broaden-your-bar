import data from "./recipes.json"

interface RecipeData {
  id: string
  name: string
  items: { ingredientId: string; parts?: number; extraInstructions?: string }[]
  glass?: string
}

type AllRecipeData = {
  [id: string]: RecipeData
}

// how tf else do I do this
const typedData = JSON.parse(JSON.stringify(data)) as RecipeData[]

const getRecipeData = (): AllRecipeData => {
  const allRecipeData: AllRecipeData = {}

  typedData.forEach(d => {
    allRecipeData[d.id] = d
  })

  return allRecipeData
}

export const recipeData: AllRecipeData = getRecipeData()
