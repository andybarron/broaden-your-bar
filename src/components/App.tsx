import React from "react"
import {
  IngredientId,
  IngredientChecklist,
  ingredientMap,
  recipeMap,
} from "../data"
import { computeAvailableRecipes, computeNextIngredient } from "../algo"
import { RecipeView } from "./RecipeView"

export function App() {
  const [checklist, setChecklist] = React.useState<IngredientChecklist>({})

  const availableIngredients = Object.keys(checklist).filter(
    (id) => checklist[id as IngredientId],
  ) as IngredientId[]

  const availableRecipes = React.useMemo(() => {
    return computeAvailableRecipes(availableIngredients, [
      ...recipeMap.values(),
    ])
  }, [availableIngredients])

  const nextIngredient = React.useMemo(() => {
    return computeNextIngredient(availableIngredients, [...recipeMap.values()])
  }, [availableIngredients])

  function toggleIngredient(id: IngredientId) {
    setChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div>
      <h1>Broaden your bar!</h1>
      <div>
        <h2>Ingredients</h2>
        {[...[...ingredientMap.entries()].entries()].map(
          ([index, [id, { name }]]) => {
            const last = index === ingredientMap.size - 1
            return (
              <span>
                <label key={id}>
                  <input
                    type="checkbox"
                    checked={Boolean(checklist[id])}
                    onChange={() => toggleIngredient(id)}
                  />
                  {name}{" "}
                </label>
                {!last && " "}
              </span>
            )
          },
        )}
      </div>
      <div>
        <h2>What to buy</h2>
        {Boolean(nextIngredient) && (
          <span>
            To maximize your drink list, you should buy: {nextIngredient}
          </span>
        )}
        {!nextIngredient && (
          <span>Buy whatever you want next, it doesn't matter</span>
        )}
      </div>
      <div>
        <h2>Available recipes</h2>
        <div>
          {availableRecipes.map((id) => {
            const key = id
            const recipe = recipeMap.get(id)
            if (!recipe) {
              return <React.Fragment key={key} />
            }
            return (
              <RecipeView
                key={key}
                ingredientMap={ingredientMap}
                recipe={recipe}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
