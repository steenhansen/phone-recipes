import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import { useServerContext } from '../../server-app/serverBrowserContext'
import { databasePost } from '../../redux-store/ajax-calls.js'
import { TypeDiet } from '../FilterParts/TypeDiet'
import { TypeCuisine } from '../FilterParts/TypeCuisine'
import { TypeMeal } from '../FilterParts/TypeMeal'
import { HeatEdit } from '../EditParts/HeatEdit'
import { ServesEdit } from '../EditParts/ServesEdit'
import { InternalEdit } from '../EditParts/InternalEdit'
import { MinutesEdit } from '../EditParts/MinutesEdit'
import { StepsEdit } from '../EditParts/StepsEdit'
import { IngredientEditTop } from '../EditParts/IngredientEditTop'
import { TitleEdit } from '../EditParts/TitleEdit'
import { IngredientCut } from '../EditParts/IngredientCut'
import { IngredientAdd } from '../EditParts/IngredientAdd'
import { SaveButton } from '../EditParts/SaveButton'
import { CancelButton } from '../EditParts/CancelButton'
import { DeleteButton } from '../EditParts/DeleteButton'
import { objectLength, ID_SEPARATOR } from "../../import-2-require/common-2-import.js";

import { PRE_RecipeEdit, type_czech } from '../../type-czech-jsx/RecipeDisplay/tc_RecipeEdit'


import { possibleErrorBoundary , recordErrorBoundary } from '../ErrorBoundaries'

export { RecipeEditBoundary }


function getRecipe(edited_values) {
  const { server_variables, the_title, the_steps, the_serves, the_time, the_meal,
    the_cuisine, the_diet, the_ingredients, the_internal, the_minutes } = edited_values;
  const the_cook = server_variables.shared_auth_email;
  const trimmed_title = the_title.trim();
  const _id = the_cook + ID_SEPARATOR + trimmed_title + ID_SEPARATOR;
  const title_steps = ' ' + trimmed_title + ' ' + the_steps + ' ';
  const the_search = the_ingredients.reduce((acc, curr) =>
    (acc + curr.ingredient + ' ' + curr.amount + ' '), title_steps);
  const zeroed_minutes = the_minutes === '' ? 0 : the_minutes;
  const edited_recipe = {
    _id: _id,
    cook: the_cook,
    title: trimmed_title,
    steps: the_steps,
    serves: the_serves,
    time: the_time,
    meal: the_meal,
    cuisine: the_cuisine,
    diet: the_diet,
    comments: [],
    ingredients: the_ingredients,
    internal: the_internal,
    minutes: zeroed_minutes,
    search: the_search
  };
  return edited_recipe;
}

async function saveTheRecipe(old_title, csrf_token, edited_values) {
  const edited_recipe = getRecipe(edited_values);
  const { the_cook, title } = edited_recipe;
  let db_save_result;
  let dispatch_payload;
  let dispatch_type = 'ajax-error';
  if (the_cook !== '') {
    if (old_title === '') {
      db_save_result = await databasePost('new-recipe', csrf_token, edited_recipe);
      dispatch_payload = edited_recipe;
      if (!(edited_recipe instanceof Error)) {
        dispatch_type = 'new-recipe';
      }
    } else {
      if (title !== old_title) {
        const re_title_data = { re_titled_recipe: edited_recipe, old_title }
        db_save_result = await databasePost('re-title-recipe', csrf_token, re_title_data);
        dispatch_payload = re_title_data;
        if (!(re_title_data instanceof Error)) {
          dispatch_type = 're-title-recipe';
        }
      } else {
        db_save_result = await databasePost('change-recipe', csrf_token, edited_recipe);
        dispatch_payload = { edited_recipe };
        if (!(edited_recipe instanceof Error)) {
          dispatch_type = 'change-recipe';
        }
      }
    }
  }
  let saved_data = { db_save_result, dispatch_type, dispatch_payload };
  return saved_data;
}

const empty_recipe = {
  title: '', steps: '', serves: '', time: '', meal: '', cuisine: '',
  diet: '', internal: '', minutes: '', ingredients: []
};








function RecipeEditFallback({ error }) {
  const error_jsx = recordErrorBoundary('RecipeEdit', error);
  return error_jsx;
}

// NB the error entered in React Components Error Boundary state.error must be a number or null, not a string?
const RecipeEditBoundary = withErrorBoundary(RecipeEdit, {
  FallbackComponent: RecipeEditFallback,
  onError(error, info) {}   // NB this does not seem to get called, so use fallback to saved error to db
})









RecipeEdit = type_czech.linkUp(RecipeEdit, PRE_RecipeEdit)
function RecipeEdit({ is_storybook, filtered_recipes, the_recipe, setEditRecipe }) {
  possibleErrorBoundary('RecipeEdit', is_storybook);

  const clickAddIngred = (add_ingredient, add_amount) => {
    const new_ingredient = [{ ingredient: add_ingredient, amount: add_amount }];
    setIngredients(new_ingredient.concat(the_ingredients));
  };

  const clickCutIngred = (delete_index) => {
    const temp_ingredients = [...the_ingredients];
    temp_ingredients.splice(delete_index, 1)
    setIngredients(temp_ingredients);
  };

  const dispatch = useDispatch()
  const server_variables = useServerContext()
  let delete_visible = true;

  if (typeof the_recipe === 'undefined' || objectLength(the_recipe) === 0) {
    the_recipe = empty_recipe;
    delete_visible = false;
  }

  let { title, steps, serves, time, meal, cuisine, diet, ingredients, internal, minutes } = the_recipe;
  let old_title = title;

  const [the_title, setTitle] = useState(title);
  const [the_steps, setSteps] = useState(steps);
  const [the_serves, setServes] = useState(serves);
  const [the_time, setTime] = useState(time);
  const [the_meal, setMeal] = useState(meal);
  const [the_cuisine, setCuisine] = useState(cuisine);
  const [the_diet, setDiet] = useState(diet);
  const [the_ingredients, setIngredients] = useState(ingredients);
  const [the_internal, setInternal] = useState(internal);
  const [the_minutes, setMinutes] = useState(minutes);

  const initial_ingredients = ingredients.reduce((acc, curr) =>
    (acc + curr.ingredient + ' ' + curr.amount + ' '), '');

  const current_ingredients = the_ingredients.reduce((acc, curr) =>
    (acc + curr.ingredient + ' ' + curr.amount + ' '), '');


  let recipe_changed = true;
  if (current_ingredients === initial_ingredients &&
    the_title === title && the_steps === steps && the_serves === serves && the_time === time && the_meal === meal
    && the_cuisine === cuisine && the_diet === diet && the_internal === internal && the_minutes === minutes) {
    recipe_changed = false;
  }



  const matching_titles = filtered_recipes.filter(a_recipe => a_recipe.title === the_title);

  let duplicate_title = true;
  if (the_title === the_recipe.title) {
    duplicate_title = false;                                   // editing old recipe without name change
  } else if (the_title !== '' && matching_titles.length === 0) {
    duplicate_title = false;
  }

  async function deleteJsxRecipe() {
    const the_cook = server_variables.shared_auth_email;
    const _id = the_cook + ID_SEPARATOR + the_title + ID_SEPARATOR;
    const delete_res = await databasePost('delete-recipe', server_variables.shared_csrfToken, { _id });
    dispatch({ type: 'delete-recipe', payload: _id });
    setEditRecipe(false)
    return delete_res;
  }


  async function saveNewRecipe() {
    const edited_values = {
      server_variables, the_title, the_steps, the_serves, the_time, the_meal,
      the_cuisine, the_diet, the_ingredients, the_internal, the_minutes
    };
    const csrf_token = server_variables.shared_csrfToken;
    const saved_data = await saveTheRecipe(old_title, csrf_token, edited_values);
    const { db_save_result, dispatch_type, dispatch_payload } = saved_data;
    dispatch({ type: dispatch_type, payload: dispatch_payload });
    setEditRecipe(false);
    return db_save_result;
  }

  return (<>
    <div className=" flex justify-between mb-5 ">




      <SaveButton recipe_changed={recipe_changed} saveNewRecipe={saveNewRecipe} duplicate_title={duplicate_title} the_title={the_title}></SaveButton>
      <CancelButton setEditRecipe={setEditRecipe}></CancelButton>
    </div>
    <TitleEdit the_title={the_title} setTitle={setTitle}></TitleEdit>
    <TypeMeal the_meal={the_meal} setMeal={setMeal} meal_name={'make_meal'}                   ></TypeMeal>
    <TypeCuisine the_cuisine={the_cuisine} setCuisine={setCuisine} cuisine_name={'make_cuisine'}  ></TypeCuisine>
    <TypeDiet the_diet={the_diet} setDiet={setDiet} diet_name={'make_diet'}  ></TypeDiet>

    <StepsEdit the_steps={the_steps} setSteps={setSteps}></StepsEdit>
    <div id="-time-serves-" className=" mt-2 ">
      <HeatEdit the_time={the_time} setTime={setTime}   ></HeatEdit>
      <ServesEdit the_serves={the_serves} setServes={setServes} ></ServesEdit>
    </div>
    <div id="-internal-minutes-" className=" mt-2 ">
      <InternalEdit the_internal={the_internal} setInternal={setInternal} ></InternalEdit>
      <MinutesEdit the_minutes={the_minutes} setMinutes={setMinutes}></MinutesEdit>
    </div>

    <IngredientEditTop the_ingredients={the_ingredients} is_minimal={false}></IngredientEditTop>
    <IngredientAdd clickAddIngred={clickAddIngred} ></IngredientAdd>

    <IngredientCut clickCutIngred={clickCutIngred} the_ingredients={the_ingredients} ></IngredientCut>
    <div className="clear-both"></div>


    <div className=" flex justify-between pt-4 ">
      <span>&nbsp;</span>
      <DeleteButton delete_visible={delete_visible} deleteJsxRecipe={deleteJsxRecipe}></DeleteButton>
      <span>&nbsp;</span>
    </div>
  </>
  )
}


