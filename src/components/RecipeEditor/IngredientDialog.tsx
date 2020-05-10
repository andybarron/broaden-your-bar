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
import red from "@material-ui/core/colors/red"
import { Ingredient } from "../../models"

export interface IngredientDialogProps {
  open: boolean
  onRemove?: (ingredient: Ingredient) => void
  onClose: () => void
  onComplete: (ingredient: Ingredient) => void
  onCancel: () => void
  ingredientToUpdate?: Ingredient
}

export function IngredientDialog({
  open,
  onRemove,
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
  const [ingredientUnit, setIngredientUnit] = React.useState<string>(
    ingredientToUpdate?.unit ?? "",
  )
  const [ingredientUnitPlural, setIngredientUnitPlural] = React.useState<
    string
  >(ingredientToUpdate?.unitPlural ?? "")

  React.useEffect(() => {
    if (ingredientToUpdate) {
      setIngredientId(ingredientToUpdate.id)
      setIngredientName(ingredientToUpdate.name)
      setIngredientPlural(ingredientToUpdate.namePlural ?? "")
      setIngredientGarnish(ingredientToUpdate.isGarnish ?? false)
      setIngredientUnit(ingredientToUpdate.unit ?? "")
      setIngredientUnitPlural(ingredientToUpdate.unitPlural ?? "")
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

  const completeDialogAction = () => {
    onComplete(getIngredient())

    // Reset Ingredient
    setIngredientId("")
    setIngredientName("")
    setIngredientPlural("")
    setIngredientGarnish(false)
  }

  const removeDialogAction = () => {
    const val = window.confirm("Are you sure?")
    if (val) onRemove!(getIngredient())
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="ingredient-dialog-title"
    >
      <DialogTitle id="ingredient-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              disabled={!!ingredientToUpdate}
              value={ingredientId}
              onChange={(event) => setIngredientId(event.target.value)}
              label="Id"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              value={ingredientName}
              onChange={(event) => setIngredientName(event.target.value)}
              label="Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={ingredientPlural}
              onChange={(event) => setIngredientPlural(event.target.value)}
              label="Name Plural"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={ingredientUnit}
              onChange={(event) => setIngredientUnit(event.target.value)}
              label="Unit"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              value={ingredientUnitPlural}
              onChange={(event) => setIngredientUnitPlural(event.target.value)}
              label="Unit Plural"
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
        {!!ingredientToUpdate && (
          <Button onClick={removeDialogAction} style={{ color: red[900] }}>
            Remove
          </Button>
        )}
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={completeDialogAction}
          color="primary"
          disabled={!ingredientId || !ingredientName}
        >
          {completeText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
