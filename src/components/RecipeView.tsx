import React from "react"
import { Recipe, Ingredient } from "../models"

export interface RecipeViewProps {
  ingredientMap: Map<string, Ingredient>
  recipe: Recipe<string>
}

export function RecipeView({ ingredientMap, recipe }: RecipeViewProps) {
  const { name, items } = recipe
  return (
    <div>
      <h3>{name}</h3>
      <ul>
        {Object.entries(items).map(([id, item]) => {
          const key = id
          if (!item) {
            return <React.Fragment key={key} />
          }
          const parts = item.parts ?? 1
          const plural = parts !== 1
          const name = ingredientMap.get(id)?.name ?? `[${id}]`
          return (
            <li key={key}>
              {parts} {plural ? "parts" : "part"} {name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
