import React from "react"
import {
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
} from "@material-ui/core"
import { Ingredient, Recipe, RecipeItem } from "../../models"
import { printRecipeItem } from "../../utils/RecipeItemUtils"

export interface RecipeDialogProps {
  open: boolean
  onComplete: (recipe: Recipe) => void
  onClose: () => void
  onCancel: () => void
  ingredients: Ingredient[]
  recipeToUpdate?: Recipe
}

export function RecipeDialog({
  open,
  onComplete,
  onClose,
  onCancel,
  ingredients,
  recipeToUpdate,
}: RecipeDialogProps) {
  const [recipeId, setRecipeId] = React.useState<string>("")
  const [hasIdError, setHasIdError] = React.useState(false)

  const [recipeName, setRecipeName] = React.useState<string>("")
  const [recipeGlass, setRecipeGlass] = React.useState<string>("")

  const [recipeItemList, setRecipeItemList] = React.useState<RecipeItem[]>([])
  const [newRecipeItemIngId, setNewRecipeItemIngId] = React.useState<string>("")
  const [newRecipeItemParts, setNewRecipeItemParts] = React.useState<number>(0)
  const [newRecipeItemEi, setNewRecipeItemEi] = React.useState<string>("")

  React.useEffect(() => {
    if (recipeToUpdate) {
      setRecipeId(recipeToUpdate.id)
      setRecipeName(recipeToUpdate.name)
      setRecipeGlass(recipeToUpdate.glass ?? "")
      setRecipeItemList(recipeToUpdate.items ?? [])
    }
  }, [recipeToUpdate])

  const getNewRecipe = (): Recipe => {
    return {
      id: recipeId,
      name: recipeName,
      glass: recipeGlass,
      items: recipeItemList,
    }
  }

  // Recipe Field Methods
  const handleRecipeIdChange = (id: string) => {
    if (id.indexOf(" ") > -1) {
      setHasIdError(true)
    } else {
      setHasIdError(false)
    }

    setRecipeId(id)
  }

  // Current RecipeItem methods
  const handleChangeSelectedIngredient = (ingredientId: string) => {
    setNewRecipeItemIngId(ingredientId)
  }

  const handleRemoveRecipeItem = (recipeItem: RecipeItem) => {
    const newRecipeItemList = recipeItemList.filter(
      item => item.ingredientId !== recipeItem.ingredientId,
    )
    setRecipeItemList(newRecipeItemList)
  }

  const handleAddRecipeItem = () => {
    const newRecipeItemList = [...recipeItemList]
    newRecipeItemList.push({
      ingredientId: newRecipeItemIngId,
      parts: newRecipeItemParts,
      extraInstructions: newRecipeItemEi !== "" ? newRecipeItemEi : undefined,
    })
    setRecipeItemList(newRecipeItemList)

    // Reset Recipe Item1
    setNewRecipeItemIngId("")
    setNewRecipeItemParts(0)
    setNewRecipeItemEi("")
  }

  const completeDialog = () => {
    onComplete(getNewRecipe())

    // Reset Recipe
    setRecipeId("")
    setRecipeName("")
    setRecipeGlass("")
    setRecipeItemList([])
    setNewRecipeItemIngId("")
    setNewRecipeItemParts(0)
    setNewRecipeItemEi("")
  }

  const title = recipeToUpdate ? "Edit Recipe" : "Add Recipe"
  const completeText = recipeToUpdate ? "Update" : "Create"

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="add-recipe-dialog-title"
    >
      <DialogTitle id="add-recipe-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6}>
            <TextField
              required
              disabled={!!recipeToUpdate}
              fullWidth
              error={hasIdError}
              value={recipeId}
              onChange={event => handleRecipeIdChange(event.target.value)}
              label="Id"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              value={recipeName}
              onChange={event => setRecipeName(event.target.value)}
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={recipeGlass}
              onChange={event => setRecipeGlass(event.target.value)}
              label="Serving glass (optional)"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography component="h2" variant="subtitle1">
              Add Items
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FormControl required fullWidth variant="outlined">
              <InputLabel id="recipe-item-select">Ingredient</InputLabel>
              <Select
                labelId="recipe-item-select"
                value={newRecipeItemIngId}
                onChange={event =>
                  handleChangeSelectedIngredient(event.target.value as string)
                }
                label="Ingredient"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {ingredients.map(i => {
                  return (
                    <MenuItem value={i.id} key={i.id}>
                      {i.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={newRecipeItemParts}
              onChange={event =>
                setNewRecipeItemParts(Number.parseInt(event.target.value, 10))
              }
              label="Parts"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={newRecipeItemEi}
              onChange={event => setNewRecipeItemEi(event.target.value)}
              label="Extra Instructions (optional)"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddRecipeItem}
              disabled={!newRecipeItemIngId}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12}>
            {recipeItemList.map(recipeItem => (
              <Chip
                style={{ margin: "3px" }}
                key={recipeItem.ingredientId}
                label={printRecipeItem(recipeItem, ingredients)}
                onDelete={() => handleRemoveRecipeItem(recipeItem)}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={completeDialog}
          color="primary"
          disabled={!recipeId || !recipeName || recipeItemList.length === 0}
        >
          {completeText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
