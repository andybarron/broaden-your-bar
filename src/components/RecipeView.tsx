import React from "react"
import { Recipe } from "../models"
import { Typography } from "@material-ui/core"
import { printRecipeItem } from "../utils/RecipeItemUtils"

export interface RecipeViewProps {
  recipe: Recipe
}

export function RecipeView({ recipe }: RecipeViewProps) {
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
        {items.map(recipeItem => {
          const key = recipeItem.ingredientId
          return (
            <li key={key}>
              <Typography component="span">
                {printRecipeItem(recipeItem)}
              </Typography>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
