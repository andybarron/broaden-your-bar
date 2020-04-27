import React from "react"
import {
  Container,
  Typography,
  Grid,
  Box,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"
import {
  IngredientId,
  IngredientChecklist,
  ingredientMap,
  recipeMap,
} from "../data"
import { computeAvailableRecipes, computeNextIngredient } from "../algo"
import { RecipeView } from "./RecipeView"

export function BarApp() {
  const [checklist, setChecklist] = React.useState<IngredientChecklist>({})

  const availableIngredients = Object.keys(checklist).filter(
    id => checklist[id as IngredientId],
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
    setChecklist(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <Container>
      <div>
        <Typography variant="h4" component="h1" gutterBottom>
          Broaden your bar!
        </Typography>
        <Box mb={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Ingredients
          </Typography>
          <Grid container>
            {[...[...ingredientMap.entries()].entries()].map(
              ([index, [id, { name }]]) => {
                return (
                  <Grid container item xs={2} key={id}>
                    <FormControlLabel
                      checked={Boolean(checklist[id])}
                      onChange={() => toggleIngredient(id)}
                      control={<Checkbox color="primary" />}
                      label={name}
                    />
                  </Grid>
                )
              },
            )}
          </Grid>
        </Box>
        <Box mb={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            What to buy
          </Typography>
          {Boolean(nextIngredient) && (
            <Typography component="span">
              To maximize your drink list, you should buy:{" "}
              {nextIngredient?.join(" or ")}
            </Typography>
          )}
          {!nextIngredient && (
            <span>Buy whatever you want next, it doesn't matter</span>
          )}
        </Box>
        <Box mb={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Available recipes
          </Typography>
          <div>
            {availableRecipes.map(id => {
              const key = id
              const recipe = recipeMap.get(id)!
              return <RecipeView key={key} recipe={recipe} />
            })}
          </div>
        </Box>
      </div>
    </Container>
  )

  // return <RecipeEditor></RecipeEditor>
}
