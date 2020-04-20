import { Optional } from "utility-types"
import { Ingredient, Recipe } from "./models"
import { recipeData } from "./data/recipeData"

/**
 * Ingredient list input data
 */
const ingredientData = {
  vodka: {},
  rum: {},
  whiskey: {},
  bourbon: {},
  coke: { name: "Coke" },
  drPepper: { name: "Dr.Pepper" },
  tequila: {},
  grenadine: {},
  tripleSec: { name: "triple sec" },
  lemonJuice: { name: "lemon juice" },
  limeJuice: { name: "lime juice" },
  orangeJuice: { name: "orange juice" },
  simpleSyrup: { name: "simple syrup" },
  soda: {},
  coffeeLiqueur: { name: "coffee liqueur" },
  marischinoCherry: {
    name: "maraschino cherry",
    namePlural: "maraschino cherries",
    isGarnish: true,
  },
  salt: {
    isGarnish: true,
    isNonEnumerated: true,
  },
}

type IngredientData = Omit<Ingredient, "id">

export type IngredientId = keyof typeof ingredientData
export type IngredientChecklist = {
  [key in IngredientId]?: boolean
}

// compile-time check for ingredientData, since annotating it would break our
// nice IngredientId definition above
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ingredientDataTypeCheck: Record<
  IngredientId,
  Optional<IngredientData, "name">
> = ingredientData

export const ingredientMap: Map<IngredientId, Ingredient> = new Map(
  Object.entries(ingredientData).map(([id, data]) => {
    return [
      id as any,
      {
        name: id,
        ...data,
        id,
      },
    ]
  }),
)

export const recipeMap: Map<string, Recipe> = new Map(
  Object.entries(recipeData).map(([id, data]) => {
    return [
      id,
      {
        id,
        name: data.name,
        items: Object.entries(data.items).map(([id, data]) => {
          return {
            ingredientId: id,
            parts: (data as any).parts ?? 1, // TODO: fix shitty typing
            extraInstructions: (data as any).extraInstructions ?? "",
          }
        }),
        glass: data.glass,
      },
    ]
  }),
)
