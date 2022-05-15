import { ButtonBase } from '../ButtonBase'

export { CancelButton }

function CancelButton({ setEditRecipe }) {
  return (
    <ButtonBase >
      <a onClick={_ => setEditRecipe(false)}>Cancel</a>
    </ButtonBase>
  )

}


