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

const entries = Object.entries(ingredientData)
const sortedEntries = sortBy(entries, entry => entry[1].name?.toLowerCase)

export const ingredientMap: Map<IngredientId, Ingredient> = new Map(
  sortedEntries.map(([id, data]) => {
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
        items: sortBy(
          Object.entries(data.items).map(([id, data]) => {
            return {
              ingredientId: id,
              parts: (data as any).parts ?? 1, // TODO: fix shitty typing
              extraInstructions: (data as any).extraInstructions ?? "",
            }
          }),
          item => (ingredientData[item.ingredientId].isGarnish ? 1 : 0),
        ),
        glass: data.glass,
      },
    ]
  }),
)
