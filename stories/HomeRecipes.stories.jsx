import React from 'react';
import { Provider } from 'react-redux'
import { HomeRecipes } from './HomeRecipes';
import { makeReduxStore } from '../redux-store/recipe-store'
import { CreateContextProvider, FilterContextProvider, ServerContextProvider } from '../app/serverBrowserContext'

export default {
  title: 'Main/HomeRecipes',
  component: HomeRecipes
};

export const Home_Recipes = () => {
  const init_redux_store2 = {
    current_recipes: [{
      _id: 's9d8f7@gmail.com~an~',
      cook: 's9d8f7@gmail.com',
      comments: [],
      search: ' -serach',
      title: '-title***',
      steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'Chinese', diet: '',
      ingredients: [], internal: '155c', minutes: 12
    }],
    current_remarks: []
  }
  var recipe_store2 = makeReduxStore(init_redux_store2)

  const filter_variables = {
    setFilterText: x => x, setFilterMeal: x => x, setFilterCuisine: x => x, setFilterDiet: x => x,
    filter_meal: '', filter_cuisine: '', filter_diet: '', filter_text: ''
  };
  var server_variables = { shared_auth_email: 'b7v6c5@gmail.com', url: '/' };
  var create_variables = { create_recipe: false, setCreateRecipe: x => x };
  return (
    <ServerContextProvider server_variables={server_variables} >
      <Provider store={recipe_store2}>
        <CreateContextProvider create_variables={create_variables} >
          <FilterContextProvider filter_variables={filter_variables} >
            <HomeRecipes is_visible_array={[true, true]} is_story_book_environment={true} ></HomeRecipes>
          </FilterContextProvider>
        </CreateContextProvider>
      </Provider>
    </ServerContextProvider>
  )
};



