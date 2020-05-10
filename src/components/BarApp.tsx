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
import { computeAvailableRecipes, computeNextIngredients } from "../algo"
import { RecipeView } from "./RecipeView"

export function BarApp() {
  const [checklist, setChecklist] = React.useState<IngredientChecklist>({})

  const availableIngredients = Object.keys(checklist).filter(
    (id) => checklist[id as IngredientId],
  ) as IngredientId[]

  const availableRecipes = React.useMemo(() => {
    return computeAvailableRecipes(availableIngredients, [
      ...recipeMap.values(),
    ])
  }, [availableIngredients])

  const nextIngredients = React.useMemo(() => {
    return computeNextIngredients(availableIngredients, [...recipeMap.values()])
  }, [availableIngredients])

  function toggleIngredient(id: IngredientId) {
    setChecklist((prev) => {
      let newChecklist = {
        ...prev,
        [id]: !prev[id],
      }
      localStorage.setItem("selected", JSON.stringify(newChecklist))
      return newChecklist
    })
  }

  React.useEffect(() => {
    const selectStr = localStorage.getItem("selected") ?? "[]"
    const selectJson = JSON.parse(selectStr)
    const savedChecklist: IngredientChecklist = {}
    Object.keys(selectJson).forEach((id) => {
      savedChecklist[id] = selectJson[id]
    })
    setChecklist(savedChecklist)
  }, [])

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
          {Boolean(nextIngredients) && (
            <Typography component="span">
              To maximize your drink list, you should buy:{" "}
              {nextIngredients?.map((r, i) => (
                <React.Fragment key={r}>
                  <a href={"https://www.amazon.com/s?k=" + r}>
                    {encodeURIComponent(r)}
                  </a>
                  {i !== nextIngredients.length - 1 ? " or " : ""}
                </React.Fragment>
              ))}
            </Typography>
          )}
          {!nextIngredients && (
            <span>Buy whatever you want next, it doesn't matter</span>
          )}
        </Box>
        <Box mb={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Available recipes
          </Typography>
          <div>
            {availableRecipes.map((id) => {
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
