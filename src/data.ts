import { Optional } from "utility-types"
import { Ingredient, Recipe } from "./models"
import { recipeData } from "./data/recipeData"
import { ingredientData } from "./data/ingredientData"
import sortBy from "lodash/sortBy"

type IngredientData = Omit<Ingredient, "id">

export type IngredientId = string
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

const allIngredients = Object.entries(ingredientData)
const sortedIngredients = sortBy(allIngredients, entry =>
  entry[1].name?.toLowerCase(),
)

export const ingredientMap: Map<IngredientId, Ingredient> = new Map(
  sortedIngredients.map(([id, data]) => {
    return [
      id as any,
      {
        id: id,
        name: id,
        ...data,
      },
    ]
  }),
)

const allRecipes = Object.entries(recipeData)
const sortedRecipes = sortBy(allRecipes, entry => entry[1].name.toLowerCase())

export const recipeMap: Map<string, Recipe> = new Map(
  sortedRecipes.map(([id, data]) => {
    return [
      id,
      {
        id,
        name: data.name,
        items: sortBy(
          data.items.map(data => {
            return {
              ingredientId: data.ingredientId,
              parts: data.parts ?? 0,
              extraInstructions: data.extraInstructions,
            }
          }),
          item => (ingredientData[item.ingredientId].isGarnish ? 1 : 0),
        ),
        glass: data.glass,
      },
    ]
  }),
)
