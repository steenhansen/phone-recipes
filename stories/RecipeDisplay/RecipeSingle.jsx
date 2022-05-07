import { withErrorBoundary } from 'react-error-boundary'

import { IngredientViewTop } from '../ViewParts/IngredientViewTop'
import { IngredientList } from '../ViewParts/IngredientList'
import { HeatView } from '../ViewParts/HeatView'
import { InternalView } from '../ViewParts/InternalView'
import { ServesView } from '../ViewParts/ServesView'
import { MinutesView } from '../ViewParts/MinutesView'
import { StepsView } from '../ViewParts/StepsView'
import { PRE_RecipeSingle, type_czech } from '../../type-czech-jsx/RecipeDisplay/tc_RecipeSingle'
import { possibleErrorBoundary , recordErrorBoundary } from '../ErrorBoundaries'

export {  RecipeSingleBoundary }

function RecipeSingleFallback({ error }) {
  const error_jsx = recordErrorBoundary('RecipeSingle', error);
  return error_jsx;
}

// NB the error entered in React Components Error Boundary state.error must be a number or null, not a string?
const RecipeSingleBoundary = withErrorBoundary(RecipeSingle, {
  FallbackComponent: RecipeSingleFallback,
  onError(error, info) {}   // NB this does not seem to get called, so use fallback to saved error to db
})


RecipeSingle = type_czech.linkUp(RecipeSingle, PRE_RecipeSingle)
function RecipeSingle({is_storybook, a_recipe, is_minimal, row_input_colour = 'bg-row-input-colour-none' }) {
  possibleErrorBoundary('RecipeSingle', is_storybook);

  let { _id, steps, serves, time, ingredients, internal, minutes } = a_recipe;
  if (minutes == '') {
    minutes = '';
  }
  const minimal_steps = (is_minimal && steps === '') ? '' : <StepsView steps={steps} row_input_colour={row_input_colour}></StepsView>

  let minimal_heat_and_serves = '';
  if (!is_minimal || time !== '' || serves !== '') {
    minimal_heat_and_serves = (
      <div id="-time-and-serves-" className=" mt-2 ">
        <HeatView time={time} row_input_colour={row_input_colour}

        ></HeatView>
        <ServesView serves={serves} row_input_colour={row_input_colour} ></ServesView>
      </div>
    )
  }

  let internal_and_timer = '';
  if (!is_minimal || internal !== '' || minutes !== '') {

    internal_and_timer = (
      <div id="-time-and-serves-" className=" mt-2 pb-1 ">
        <InternalView internal={internal} row_input_colour={row_input_colour}></InternalView>
        <MinutesView minutes={minutes} row_input_colour={row_input_colour}></MinutesView>
      </div>
    )
  }
  const the_key = 'recipe_single_' + _id;
  return (
    <div key={the_key} className="-mt-1 clear-both" >
      {minimal_steps}
      {minimal_heat_and_serves}
      {internal_and_timer}
      <IngredientViewTop the_ingredients={ingredients} is_minimal={is_minimal}></IngredientViewTop>
      <IngredientList ingredients={ingredients} row_input_colour={row_input_colour} ></IngredientList>
      <div className="pb-2 clear-both"></div>
    </div>
  )
}
