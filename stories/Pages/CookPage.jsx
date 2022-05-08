import React, { useState } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import { CookRecipes } from '../CookRecipes'
import { CookRemarks } from '../ViewParts/CookRemarks'
import { useSelector } from 'react-redux'
import { useServerContext, useCreateContext } from '../../app/serverBrowserContext'
import {  userToUrl } from "../../import-2-require/common-2-import";

import { possibleErrorBoundary , recordErrorBoundary } from '../ErrorBoundaries'


export { CookPageBoundary }

function CookPageFallback({ error }) {
  const error_jsx = recordErrorBoundary('CookPage', error);
  return error_jsx;
}

// NB the error entered in React Components Error Boundary state.error must be a number or null, not a string?
const CookPageBoundary = withErrorBoundary(CookPage, {
  FallbackComponent: CookPageFallback,
  onError(error, info) {}   // NB this does not seem to get called, so use fallback to saved error to db
})


function CookPage({is_storybook}) {
  possibleErrorBoundary('CookPage', is_storybook);

  const current_recipes = useSelector((recipe_store2) => recipe_store2.current_recipes)
  const server_variables = useServerContext()
  const { shared_auth_email,url } = server_variables;

  const user_url = userToUrl(shared_auth_email);
  const user_on_own_page = (user_url === url)

  
  let remarks_of_cook = '';
  if (user_on_own_page) {
    
    const current_remarks = useSelector((recipe_store2) => recipe_store2.current_remarks)
    remarks_of_cook =  <CookRemarks cooks_remarks={current_remarks}  ></CookRemarks>;
  }
  
  const hide_all_recipes = Array(current_recipes.length).fill(false);
  const [is_visible_array, setVisibleRecipes] = useState(hide_all_recipes);
  const { create_recipe, edit_recipe } = useCreateContext();

  if (shared_auth_email === '' || edit_recipe || create_recipe) {
    return (
      <>
      <CookRecipes
        current_recipes={current_recipes} is_visible_array={is_visible_array}
        setVisibleRecipes={setVisibleRecipes} ></CookRecipes>
            </>
    )
  }
  return (
    <>
      <CookRecipes
        current_recipes={current_recipes} is_visible_array={is_visible_array}
        setVisibleRecipes={setVisibleRecipes} ></CookRecipes>
      {remarks_of_cook} 
    </>
  )

}

