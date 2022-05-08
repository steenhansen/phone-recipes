import React from 'react';
import { Provider } from 'react-redux'
import { CookRecipes } from './CookRecipes';
import { makeReduxStore } from '../redux-store/recipe-store'
import { CreateContextProvider, FilterContextProvider, ServerContextProvider } from '../app/serverBrowserContext'

export default {
  title: 'Main/CookRecipes',
  component: CookRecipes
};

export const Cook_Recipes = () => {
  const init_redux_store2 = {
    current_recipes: [{
      _id: 'x4e4r4@gmail.com~an~',
      cook: 'x4e4r4@gmail.com',
      comments: [],
      search: ' -serach',
      title: '-title***',
      steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
      ingredients: [], internal: '145c', minutes: 12
    }],
    current_remarks: []
  }
  var recipe_store2 = makeReduxStore(init_redux_store2)

  const filter_variables = {
    setFilterText: x => x, setFilterMeal: x => x, setFilterCuisine: x => x, setFilterDiet: x => x,
    filter_meal: '', filter_cuisine: '', filter_diet: '', filter_text: ''
  };
  var server_variables = { shared_auth_email: 'e2e4t7@gmail.com', url:'/'};
  var create_variables = { create_recipe: false, setCreateRecipe: x => x };
  return (
    <ServerContextProvider server_variables={server_variables} >
      <Provider store={recipe_store2}>
        <CreateContextProvider create_variables={create_variables} >
          <FilterContextProvider filter_variables={filter_variables} >
            <CookRecipes  is_visible_array={[true, true]} ></CookRecipes>
          </FilterContextProvider>
        </CreateContextProvider>
      </Provider>
    </ServerContextProvider>
  )
};

