import React from 'react';
import { MinimalPageBoundary } from './MinimalPage';
import { ServerContextProvider } from '../../server-app/serverBrowserContext'

export default {
  title: 'Pages/MinimalPage',
  component: MinimalPageBoundary
};

export const MinimalPage = () => {

  const the_recipes = [{
    _id: 'x4e4r4@gmail.com~Gazpacho Soup~',
    cook: 'x4e4r4@gmail.com',
    comments: [],
    search: ' -serach',
    title: 'Gazpacho Soup 1',
    steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
    ingredients: [], internal: '145c', minutes: 11
  },
  {
    _id: 'x4e4r4@gmail.com~Gazpacho Soup2~',
    cook: 'x4e4r4@gmail.com',
    comments: [],
    search: ' -serach',
    title: 'Gazpacho Soup 2',
    steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
    ingredients: [], internal: '145c', minutes: 12
  },
  {
    _id: 'x4e4r4@gmail.com~Gazpacho Soup3~',
    cook: 'x4e4r4@gmail.com',
    comments: [],
    search: ' -serach',
    title: 'Gazpacho Soup 3',
    steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
    ingredients: [], internal: '145c', minutes: 13
  }];


  var server_variables = { shared_store_recipes: the_recipes};
  return (
    <ServerContextProvider server_variables={server_variables} >
      <MinimalPageBoundary ></MinimalPageBoundary>
    </ServerContextProvider>
  )
};








export const MinimalPageDeleted = () => {

  const the_recipes = [{
    _id: 'x4e4r4@gmail.com~Gazpacho Soup~',
    cook: 'x4e4r4@gmail.com',
    comments: [],
    search: ' -serach',
    title: 'Gazpacho Soup',
    steps: 'steps', serves: 'serves', time: 'time', meal: 'Lunch', cuisine: 'French', diet: 'Vegan',
    ingredients: [], internal: '145c', minutes: 11
  },
  { deleted: true, title: 'A-Removed-Recipe' }
];


  var server_variables = { shared_store_recipes: the_recipes };
  return (
    <ServerContextProvider server_variables={server_variables} >
      <MinimalPageBoundary ></MinimalPageBoundary>
    </ServerContextProvider>
  )
};






export const Error_boundary_MinimalPage = () => {
  const the_recipes = [];
  var server_variables = { shared_store_recipes: the_recipes};
  return (
    <ServerContextProvider server_variables={server_variables} >
      <MinimalPageBoundary is_storybook={'boundary-crash'}  ></MinimalPageBoundary>
    </ServerContextProvider>
  )
};

