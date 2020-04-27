import React from "react"
import { Container, Typography, Grid, Button, Chip } from "@material-ui/core"
import { ingredientMap, recipeMap } from "../../data"
import { Ingredient, Recipe } from "../../models"
import { RecipeDialog } from "./RecipeDialog"
import { IngredientDialog } from "./IngredientDialog"
import sortBy from "lodash/sortBy"

export function RecipeEditor() {
  // Dialow Show Variables
  const [showAddIngredient, setShowAddIngredient] = React.useState(false)
  const [showEditIngredient, setShowEditIngredient] = React.useState(false)
  const [showAddRecipe, setShowAddRecipe] = React.useState(false)
  const [showEditRecipe, setShowEditRecipe] = React.useState(false)

  // Edit Variables
  const [ingredientToUpdate, setIngredientToUpdate] = React.useState<
    Ingredient
  >()
  const [recipeToUpdate, setRecipeToUpdate] = React.useState<Recipe>()

  // All Data Lists
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([
    ...ingredientMap.values(),
  ])
  const [recipes, setRecipes] = React.useState<Recipe[]>([
    ...recipeMap.values(),
  ])

  // Add Ingredient Methods
  const handleCreateNewIngredient = (ingredient: Ingredient) => {
    let newIngredients = [...ingredients]
    newIngredients.push(ingredient)
    newIngredients = sortBy(newIngredients, i => i.name.toLowerCase())
    setIngredients(newIngredients)
    setShowAddIngredient(false)
  }

  // Add Recipe Methods
  const handleCreateNewRecipe = (recipe: Recipe) => {
    let newRecipes = [...recipes]
    newRecipes.push(recipe)
    newRecipes = sortBy(newRecipes, r => r.name.toLowerCase())
    setRecipes(newRecipes)
    setShowAddRecipe(false)
  }

  // Edit Ingredient Methods
  const handleSelectIngredient = (ingredient: Ingredient) => {
    setIngredientToUpdate(ingredient)
    setShowEditIngredient(true)
  }

  const handleEditIngredient = (ingredient: Ingredient) => {
    let newIngredients = [...ingredients]
    const index = newIngredients.findIndex(i => i.id === ingredient.id)
    newIngredients.splice(index, 1)
    newIngredients.push(ingredient)
    newIngredients = sortBy(newIngredients, i => i.name.toLowerCase())
    setIngredients(newIngredients)
    setShowEditIngredient(false)
  }

  // Edit Recipe Methods
  const handleSelectRecipe = (recipe: Recipe) => {
    setRecipeToUpdate(recipe)
    setShowEditRecipe(true)
  }

  const handleEditRecipe = (recipe: Recipe) => {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === recipe.id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
    setShowEditRecipe(false)
  }

  return (
    <Container>
      <RecipeDialog
        open={showAddRecipe}
        onComplete={handleCreateNewRecipe}
        onClose={() => setShowAddRecipe(false)}
        onCancel={() => setShowAddRecipe(false)}
        ingredients={ingredients}
      />
      <RecipeDialog
        open={showEditRecipe}
        onComplete={handleEditRecipe}
        onClose={() => setShowEditRecipe(false)}
        onCancel={() => setShowEditRecipe(false)}
        ingredients={ingredients}
        recipeToUpdate={recipeToUpdate}
      />
      <IngredientDialog
        open={showAddIngredient}
        onComplete={handleCreateNewIngredient}
        onClose={() => setShowAddIngredient(false)}
        onCancel={() => setShowAddIngredient(false)}
      />
      <IngredientDialog
        open={showEditIngredient}
        onComplete={handleEditIngredient}
        onClose={() => setShowEditIngredient(false)}
        onCancel={() => setShowEditIngredient(false)}
        ingredientToUpdate={ingredientToUpdate}
      />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Grid item xs={12} style={{ marginBottom: "10px" }}>
            <Typography component="h2" variant="h6">
              Ingredients
            </Typography>
            <Button
              variant="contained"
              onClick={() => setShowAddIngredient(true)}
            >
              Add Ingredient
            </Button>
          </Grid>
          <Grid item xs={12}>
            {ingredients.map(ingredient => {
              return (
                <Chip
                  key={ingredient.id}
                  label={ingredient.name}
                  variant="outlined"
                  style={{ margin: "3px" }}
                  onClick={() => handleSelectIngredient(ingredient)}
                />
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12} style={{ marginBottom: "10px" }}>
            <Typography component="h2" variant="h6">
              Recipes
            </Typography>
            <Button variant="contained" onClick={() => setShowAddRecipe(true)}>
              Add Recipe
            </Button>
          </Grid>
          <Grid item xs={12}>
            {recipes.map(recipe => {
              return (
                <Chip
                  key={recipe.id}
                  label={recipe.name}
                  variant="outlined"
                  style={{ margin: "3px" }}
                  onClick={() => handleSelectRecipe(recipe)}
                />
              )
            })}
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <pre>{JSON.stringify(ingredients, null, 2)}</pre>
        </Grid>
        <Grid item xs={6}>
          <pre>{JSON.stringify(recipes, null, 2)}</pre>
        </Grid>
      </Grid>
    </Container>
  )
}
