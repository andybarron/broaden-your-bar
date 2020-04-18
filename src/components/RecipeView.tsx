import React from "react"
import { Recipe, Ingredient } from "../models"

export interface RecipeViewProps {
  ingredientMap: Map<string, Ingredient>
  recipe: Recipe
}

export function RecipeView({ ingredientMap, recipe }: RecipeViewProps) {
  const { name, items } = recipe
  return (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map(({ ingredientId: id, parts }) => {
          const key = id
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
