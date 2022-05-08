import React from 'react'
import { withErrorBoundary } from 'react-error-boundary'


import { RecipeSingleBoundary } from '../RecipeDisplay/RecipeSingle'

import { useServerContext } from '../../server-app/serverBrowserContext'
import { TitleMinimal } from '../ViewParts/TitleMinimal'
import { StopWatch } from '../ViewParts/StopWatch'
import { FatHorz } from '../HorzBar'
import { possibleErrorBoundary, recordErrorBoundary } from '../ErrorBoundaries'

export { MinimalPageBoundary }

function MinimalPageFallback({ error }) {
  const error_jsx = recordErrorBoundary('MinimalPage', error);
  return error_jsx;
}

// NB the error entered in React Components Error Boundary state.error must be a number or null, not a string?
const MinimalPageBoundary = withErrorBoundary(MinimalPage, {
  FallbackComponent: MinimalPageFallback,
  onError(error, info) { }   // NB this does not seem to get called, so use fallback to saved error to db
})



function MinimalSingle(a_recipe, index) {
  const { deleted, title, minutes } = a_recipe;
  const title_blanks = title.replace('%20', ' ');

  const the_key = '-MinimumSingle-' + index;

  let row_color = '';
  let row_input_colour = 'bg-row-input-colour-none';
  if (index % 2) {
    row_color = 'bg-row-colour';
    row_input_colour = 'bg-row-input-colour';
  }

  if (deleted) {
    return (
      <div key={the_key} className={`  ${row_color} `} >
        <TitleMinimal title={title_blanks} index={index} a_recipe={a_recipe}></TitleMinimal>
        Deleted
      </div >
    )
  }

  const selenium_id = title_blanks;
  return (
    <div id={selenium_id} key={the_key} className={`  ${row_color} `} >
      <TitleMinimal title={title_blanks} index={index} a_recipe={a_recipe}></TitleMinimal>
      <RecipeSingleBoundary a_recipe={a_recipe} is_minimal={true} row_input_colour={row_input_colour}></RecipeSingleBoundary>
      <StopWatch num_minutes={minutes}></StopWatch>
    </div >
  )
}

function MinimalPage({ is_storybook }) {

  possibleErrorBoundary('MinimalPage', is_storybook);
  const server_variables = useServerContext()
  const { shared_store_recipes } = server_variables;
  const recipe_list = shared_store_recipes.map((one_recipe, index) => MinimalSingle(one_recipe, index));

  const the_page = (
    <>
      {recipe_list}
      <br />
      <FatHorz FatHorz="m-2"></FatHorz>
      <br />
      <StopWatch num_minutes={-1}></StopWatch>
    </>
  )
  return the_page;
}
