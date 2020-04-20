import React from "react"
import { Recipe, Ingredient } from "../models"

export interface RecipeViewProps {
  ingredientMap: Map<string, Ingredient>
  recipe: Recipe
}

export function RecipeView({ ingredientMap, recipe }: RecipeViewProps) {
  const { name, items, glass } = recipe
  return (
    <div>
      <h3>{name}</h3>
      <span>{glass !== undefined && glass.length !== 0 ? "Serve in a " + glass : ""}</span>
      <ul>
        {items.map(({ ingredientId: id, parts, extraInstructions }) => {
          const key = id
          const plural = parts > 1
          const name = ingredientMap.get(id)?.name ?? `[${id}]`
          const namePlural = ingredientMap.get(id)?.namePlural ?? `[${id}]`
          const isNonEnumerated = ingredientMap.get(id)?.isNonEnumerated

          if (ingredientMap.get(id)?.isGarnish) {
            return (
              <li key={key}>
                {isNonEnumerated ? "" : parts} {plural ? namePlural : name} {extraInstructions} {"as garnish"}
              </li>
            )
          } else {
            return (
              <li key={key}>
                {parts} {plural ? "parts" : "part"} {name}
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}
