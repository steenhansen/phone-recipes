import { ButtonBase } from "../ButtonBase";
import { SHORTEST_STRING_LEN } from "../../import-2-require/common-2-import.js";

export { SaveButton };

function SaveButton({ recipe_changed, saveNewRecipe, duplicate_title, the_title }) {
  const trimmed_title = the_title.trim();
  if (trimmed_title.length < SHORTEST_STRING_LEN) {
    return (
      <ButtonBase className="" is_disabled={true}>
        <a onClick={saveNewRecipe}>Save - Too Short</a>
      </ButtonBase>
    );
  } else if (duplicate_title) {
    return (
      <ButtonBase className="" is_disabled={true}>
        <a>Save - Duplicate</a>
      </ButtonBase>
    );
  } else if (!recipe_changed) {
    return (
      <ButtonBase className="" is_disabled={true}>
        <a>Save Recipe</a>
      </ButtonBase>
    );
  } else {
    return (
      <ButtonBase className="">
        <a id="--save--recipe--" onClick={saveNewRecipe}>
          Save Recipe
        </a>
      </ButtonBase>
    );
  }
}
