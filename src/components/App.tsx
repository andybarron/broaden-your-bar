import React from "react"
import { IngredientId, ingredientMap } from "../data"

type IngredientChecklist = {
  [key in IngredientId]?: boolean
}

export function App() {
  const [checklist, setChecklist] = React.useState<IngredientChecklist>({})

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
        {[...ingredientMap.entries()].map(([id, { name }]) => {
          return (
            <label key={id}>
              {name}{" "}
              <input
                type="checkbox"
                checked={Boolean(checklist[id])}
                onChange={() => toggleIngredient(id)}
              />
            </label>
          )
        })}
      </div>
    </div>
  )
}
