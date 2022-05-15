import React from 'react';
import { Provider } from 'react-redux'
import { ServerContextProvider } from '../../server-app/serverBrowserContext'
import { makeReduxStore } from '../../redux-store/recipe-store'
import { RecipeEditBoundary } from './RecipeEdit';

export default {
  title: 'Display/RecipeEdit',
  component: RecipeEditBoundary,
};

export const RecipeEdit = (args) => {
  const init_redux_store2 = {
    filtered_recipes: []
    , the_recipe: {}
  };
  var recipe_store2 = makeReduxStore(init_redux_store2)

  const the_filtered_recipes = [{
    _id: '_id', cook: 't7r7e7@gmail.com', title: 'title_x', steps: '', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
    ingredients: [], internal: '145c', minutes: 12, comments: [], search: ' s '
  }];
  const the_recipe = {
    _id: '_id', cook: 't7r7e7@gmail.com', title: 'title_x', steps: '', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
    ingredients: [], internal: '145c', minutes: 12, comments: [], search: ' s '
  }
  var server_variables = { shared_auth_email: 't7r7e7@gmail.com', url: '/' };

  return (
    <Provider store={recipe_store2}>
      <ServerContextProvider server_variables={server_variables} >
        <RecipeEditBoundary filtered_recipes={the_filtered_recipes} the_recipe={the_recipe}></RecipeEditBoundary>
      </ServerContextProvider>
    </Provider>
  )
};

export const Error_boundary_RecipeEdit = (args) => {
  const init_redux_store2 = {
    filtered_recipes: []
    , the_recipe: {}
  };
  var recipe_store2 = makeReduxStore(init_redux_store2)

  const the_filtered_recipes = [{
    _id: '_id', cook: 't7r7e7@gmail.com', title: 'title_x', steps: '', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
    ingredients: [], internal: '145c', minutes: 12, comments: [], search: ' s '
  }];
  const the_recipe = {
    _id: '_id', cook: 't7r7e7@gmail.com', title: 'title_x', steps: '', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
    ingredients: [], internal: '145c', minutes: 12, comments: [], search: ' s '
  }
  var server_variables = { shared_auth_email: 't7r7e7@gmail.com', url: '/' };

  return (
    <Provider store={recipe_store2}>
      <ServerContextProvider server_variables={server_variables} >
        <RecipeEditBoundary is_storybook={'boundary-crash'}
          filtered_recipes={the_filtered_recipes} the_recipe={the_recipe}></RecipeEditBoundary>
      </ServerContextProvider>
    </Provider>
  )
};