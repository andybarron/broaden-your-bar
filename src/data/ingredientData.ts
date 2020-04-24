/**
 * Ingredient list input data
 */
export const ingredientData: IngredientData = {
  bourbon: {},
  coffeeLiqueur: { name: "coffee liqueur" },
  coke: { name: "Coke" },
  drPepper: { name: "Dr.Pepper" },
  grenadine: {},
  lemonJuice: { name: "lemon juice" },
  limeJuice: { name: "lime juice" },
  marischinoCherry: {
    name: "maraschino cherry",
    namePlural: "maraschino cherries",
    isGarnish: true,
  },
  orangeJuice: { name: "orange juice" },
  rum: {},
  salt: { isGarnish: true, isNonEnumerated: true },
  simpleSyrup: { name: "simple syrup" },
  soda: {},
  tequila: {},
  tripleSec: { name: "triple sec" },
  vodka: {},
  whiskey: {},
}

interface IngredientData {
  [id: string]: {
    name?: string
    namePlural?: string
    isGarnish?: boolean //TODO garnish type
    isNonEnumerated?: boolean
  }
}
