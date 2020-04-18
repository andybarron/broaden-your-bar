interface RecipeData {
  name: string
  items: {
    [ingredientId: string]: { parts?: number }
  }
}

type AllRecipeData = {
  [id: string]: RecipeData
}

/**
 * Recipe list input data
 */
export const recipeData: AllRecipeData = {
  rumAndCoke: {
    name: "rum & coke",
    items: {
      rum: {},
      coke: {},
    },
  },
  tequilaSunrise: {
    name: "tequila sunrise",
    items: {
      tequila: {},
      orangeJuice: {},
      grenadine: {},
    },
  },
}
