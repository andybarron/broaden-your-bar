import React from "react"
import { IngredientId, IngredientChecklist, ingredientMap } from "../data"

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
        {[...[...ingredientMap.entries()].entries()].map(
          ([index, [id, { name }]]) => {
            const last = index === ingredientMap.size - 1
            return (
              <span>
                <label key={id}>
                  {name}{" "}
                  <input
                    type="checkbox"
                    checked={Boolean(checklist[id])}
                    onChange={() => toggleIngredient(id)}
                  />
                </label>
                {!last && " "}
              </span>
            )
          },
        )}
      </div>
    </div>
  )
}
