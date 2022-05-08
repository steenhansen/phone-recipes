import { ButtonBase } from '../ButtonBase'
//import { useServerContext } from '../../../server-app/serverBrowserContext'

export { EditButton }

function EditButton({ _id, setEditRecipe }) {

  return (
    <ButtonBase className="float-right mt-2"  >
      <a id="_edit-recipe_" onClick={x => setEditRecipe(_id)}>Edit Recipe</a>
    </ButtonBase>
  )
}

