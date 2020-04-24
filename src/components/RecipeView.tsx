import React from "react"
import { Recipe, Ingredient } from "../models"
import { Typography } from "@material-ui/core"

export interface RecipeViewProps {
  ingredientMap: Map<string, Ingredient>
  recipe: Recipe
}

export function RecipeView({ ingredientMap, recipe }: RecipeViewProps) {
  const { name, items, glass } = recipe
  return (
    <div>
      <Typography component="h3">
        <b>{name}</b>
      </Typography>
      <Typography>
        {glass !== undefined && glass.length !== 0 ? "Serve in a " + glass : ""}
      </Typography>
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
                <Typography component="span">
                  {isNonEnumerated ? "" : parts} {plural ? namePlural : name}{" "}
                  {extraInstructions} {"as garnish"}
                </Typography>
              </li>
            )
          } else {
            return (
              <li key={key}>
                <Typography component="span">
                  {parts} {plural ? "parts" : "part"} {name}
                </Typography>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}
