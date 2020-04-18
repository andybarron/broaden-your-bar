interface RecipeData {
  name: string
  items: {
    [ingredientId: string]: { parts?: number; extraInstructions?: string }
  }
  glass?: string
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
  cherryBourbonSmash: {
    name: "cherry bourbon smash",
    items: {
      bourbon: {},
      lemonJuice: {},
      marischinoCherry: { parts: 3, extraInstructions: "muddled" },
      drPepper: {},
    },
  },
  margarita: {
    name: "margarita",
    items: {
      tequila: { parts: 3 },
      limeJuice: { parts: 2 },
      simpleSyrup: {},
      tripleSec: {},
      salt: {},
    },
    glass: "margarita glass",
  },
}
