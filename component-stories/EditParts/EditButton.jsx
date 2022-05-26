import { ButtonBase } from "../ButtonBase";

export { EditButton };

function EditButton({ _id, setEditRecipe }) {
  return (
    <ButtonBase className="float-right mt-2">
      <a id="--edit--recipe--" onClick={(x) => setEditRecipe(_id)}>
        Edit Recipe
      </a>
    </ButtonBase>
  );
}
