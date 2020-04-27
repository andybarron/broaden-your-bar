import React from "react"
import {
  Grid,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core"
import { Ingredient } from "../../models"

export interface IngredientDialogProps {
  open: boolean
  onClose: () => void
  onComplete: (ingredient: Ingredient) => void
  onCancel: () => void
  ingredientToUpdate?: Ingredient
}

export function IngredientDialog({
  open,
  onClose,
  onComplete,
  onCancel,
  ingredientToUpdate,
}: IngredientDialogProps) {
  const [ingredientId, setIngredientId] = React.useState<string>(
    ingredientToUpdate?.id ?? "",
  )
  const [ingredientName, setIngredientName] = React.useState<string>(
    ingredientToUpdate?.name ?? "",
  )
  const [ingredientPlural, setIngredientPlural] = React.useState<string>(
    ingredientToUpdate?.namePlural ?? "",
  )
  const [ingredientGarnish, setIngredientGarnish] = React.useState(
    ingredientToUpdate?.isGarnish ?? false,
  )

  React.useEffect(() => {
    if (ingredientToUpdate) {
      setIngredientId(ingredientToUpdate.id)
      setIngredientName(ingredientToUpdate.name)
      setIngredientPlural(ingredientToUpdate.namePlural ?? "")
      setIngredientGarnish(ingredientToUpdate.isGarnish ?? false)
    }
  }, [ingredientToUpdate])

  const title = ingredientToUpdate ? "Edit Ingredient" : "Add Ingredient"
  const completeText = ingredientToUpdate ? "Update" : "Create"

  const getIngredient = (): Ingredient => {
    return {
      id: ingredientId,
      name: ingredientName,
      namePlural: ingredientPlural !== "" ? ingredientPlural : undefined,
      isGarnish: ingredientGarnish ? ingredientGarnish : undefined,
    }
  }

  const completeDialog = () => {
    onComplete(getIngredient())

    // Reset Ingredient
    setIngredientId("")
    setIngredientName("")
    setIngredientPlural("")
    setIngredientGarnish(false)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="ingredient-dialog-title"
    >
      <DialogTitle id="ingredient-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Grid container item xs={6} spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              disabled={!!ingredientToUpdate}
              value={ingredientId}
              onChange={event => setIngredientId(event.target.value)}
              label="Id"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              value={ingredientName}
              onChange={event => setIngredientName(event.target.value)}
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={ingredientPlural}
              onChange={event => setIngredientPlural(event.target.value)}
              label="Name Plural"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              checked={ingredientGarnish}
              onChange={(_, checked) => setIngredientGarnish(checked)}
              control={<Checkbox name="isGarnish" color="primary" />}
              label="Garnish?"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={completeDialog} color="primary">
          {completeText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
