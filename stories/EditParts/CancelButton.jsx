import { ButtonBase } from '../ButtonBase'

export { CancelButton }

function CancelButton({ setEditRecipe }) {
  return (
    <ButtonBase >
      <a id="cancel-yellow" onClick={_ => setEditRecipe(false)}>Cancel</a>
    </ButtonBase>
  )

}


