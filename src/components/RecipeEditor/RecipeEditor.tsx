import React from "react"
import {
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  IconButton,
  Snackbar,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
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

  // Local Storage methods
  const getSavedIngredients = () => {
    return JSON.parse(
      localStorage.getItem("ingredients") ?? "[]",
    ) as Ingredient[]
  }

  const getSavedRecipes = () => {
    return JSON.parse(localStorage.getItem("recipes") ?? "[]") as Recipe[]
  }

  const storeSavedIngredients = (savedIngredients: Ingredient[]) => {
    localStorage.setItem("ingredients", JSON.stringify(savedIngredients))
  }

  const storeSavedRecipes = (savedRecipes: Recipe[]) => {
    localStorage.setItem("recipes", JSON.stringify(savedRecipes))
  }

  // On page load, load any saved ingredients and recipes
  React.useEffect(() => {
    const savedIngredients = getSavedIngredients()
    const savedRecipes = getSavedRecipes()

    const loadedIngredientIds = ingredients.map((i) => i.id)
    const loadedRecipeIds = recipes.map((i) => i.id)

    // Clean up Local Storage
    // Remove any ingredients/recipes that are already saved
    const newStorageIngredients = savedIngredients.filter(
      (i) => loadedIngredientIds.indexOf(i.id) < 0,
    )
    const newStorageRecipes = savedRecipes.filter(
      (r) => loadedRecipeIds.indexOf(r.id) < 0,
    )

    storeSavedIngredients(newStorageIngredients)
    storeSavedRecipes(newStorageRecipes)

    // Add all storaged ingredients/recipes
    const newIngredients = sortBy(
      ingredients.concat(newStorageIngredients),
      (i) => i.name.toLowerCase(),
    )
    const newRecipes = sortBy(recipes.concat(newStorageRecipes), (i) =>
      i.name.toLowerCase(),
    )
    setIngredients(newIngredients)
    setRecipes(newRecipes)
  }, [])

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  // Add Ingredient Methods
  const handleCreateNewIngredient = (ingredient: Ingredient) => {
    let newIngredients = [...ingredients]
    newIngredients.push(ingredient)
    newIngredients = sortBy(newIngredients, (r) => r.name.toLowerCase())
    setIngredients(newIngredients)
    setShowAddIngredient(false)

    const savedIngredients = getSavedIngredients()
    savedIngredients.push(ingredient)
    storeSavedIngredients(savedIngredients)
  }

  // Add Recipe Methods
  const handleCreateNewRecipe = (recipe: Recipe) => {
    let newRecipes = [...recipes]
    newRecipes.push(recipe)
    newRecipes = sortBy(newRecipes, (r) => r.name.toLowerCase())
    setRecipes(newRecipes)
    setShowAddRecipe(false)

    const savedRecipes = getSavedRecipes()
    savedRecipes.push(recipe)
    storeSavedRecipes(savedRecipes)
  }

  // Edit Ingredient Methods
  const handleSelectIngredient = (ingredient: Ingredient) => {
    setIngredientToUpdate(ingredient)
    setShowEditIngredient(true)
  }

  // Remove Ingredient Methods
  const removeIngredient = (ingredient: Ingredient) => {
    const newIngredients = ingredients.filter((i) => i.id !== ingredient.id)
    setIngredients(newIngredients)
    setShowEditIngredient(false)

    const savedIngredients = getSavedIngredients()
    if (savedIngredients.map((s) => s.id).indexOf(ingredient.id) > -1) {
      const newSavedIngredients = savedIngredients.filter(
        (s) => s.id != ingredient.id,
      )
      storeSavedIngredients(newSavedIngredients)
    }
  }

  const handleEditIngredient = (ingredient: Ingredient) => {
    let newIngredients = [...ingredients]
    const index = newIngredients.findIndex((i) => i.id === ingredient.id)
    newIngredients.splice(index, 1)
    newIngredients.push(ingredient)
    newIngredients = sortBy(newIngredients, (i) => i.name.toLowerCase())
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
    const index = newRecipes.findIndex((r) => r.id === recipe.id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
    setShowEditRecipe(false)
  }

  // Remove Recipe Methods
  const removeRecipe = (recipe: Recipe) => {
    const newRecipes = recipes.filter((r) => r.id !== recipe.id)
    setRecipes(newRecipes)
    setShowEditRecipe(false)

    const savedRecipes = getSavedRecipes()
    if (savedRecipes.map((s) => s.id).indexOf(recipe.id) > -1) {
      const newSavedRecipes = savedRecipes.filter((s) => s.id != recipe.id)
      storeSavedRecipes(newSavedRecipes)
    }
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
        onRemove={removeRecipe}
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
        onRemove={removeIngredient}
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
            {ingredients.map((ingredient) => {
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
            {recipes.map((recipe) => {
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
          <Chip
            label="Copy Ingredients JSON"
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(ingredients, null, 2),
              )
              handleOpenSnackbar()
            }}
          />
          <pre id="ingredients-json">
            {JSON.stringify(ingredients, null, 2)}
          </pre>
        </Grid>
        <Grid item xs={6}>
          <Chip
            label="Copy Recipe JSON"
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(recipes, null, 2))
              handleOpenSnackbar()
            }}
          />
          <pre>{JSON.stringify(recipes, null, 2)}</pre>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Copied!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  )
}
