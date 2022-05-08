import React, { useState, useEffect } from 'react'

import { CreateContextProvider, useServerContext, FilterContextProvider } from '../../server-app/serverBrowserContext'
import { MenuHeader } from './MenuHeader'
import { MenuFooter } from './MenuFooter'
import { TextFilter } from '../FilterParts/TextFilter'
import { TypeDiet } from '../FilterParts/TypeDiet'
import { TypeCuisine } from '../FilterParts/TypeCuisine'
import { TypeMeal } from '../FilterParts/TypeMeal'
import { userToUrl } from "../../import-2-require/common-2-import";
import { ButtonBase } from '../ButtonBase'
import { FatHorz } from '../HorzBar'

export { FilterMenu }

function SignInOrCreate({ setCreateRecipe }) {
  const server_variables = useServerContext()
  const { shared_auth_email, url } = server_variables;
  const clean_url = (url.split('?'))[0]
  const user_url = userToUrl(shared_auth_email)
  let href_link
  if (shared_auth_email === '') {
    href_link = <a href="/login/federated/google">Gmail Sign In</a>
  } else if (clean_url === user_url) {
    href_link = <a id="_create-recipe_" onClick={_ => setCreateRecipe(true)}>Create Recipe</a>
  } else {
    const jump_to_create = user_url + '?q=create';
    href_link = <a id="_create-recipe_" href={jump_to_create}>Create Recipe</a>
  }

  const top_button2 = (
    <div className=" base-width -mt-4 ">
      <ButtonBase className="mx-auto block" >
        {href_link}
      </ButtonBase>
      <FatHorz className="m-2"></FatHorz>

    </div>
  )
  return top_button2
}

function FilterMenu({ children }) {
  const server_variables = useServerContext()
  const { url } = server_variables;

  function FilterRecipes() {
    return (<>
      <TextFilter filter_text={filter_text} setFilterText={setFilterText}    ></TextFilter>
      <TypeMeal the_meal={filter_meal} setMeal={setFilterMeal} meal_name={'filter_meal'}    ></TypeMeal>
      <TypeCuisine the_cuisine={filter_cuisine} setCuisine={setFilterCuisine} cuisine_name={'filter_cuisine'} ></TypeCuisine>
      <TypeDiet the_diet={filter_diet} setDiet={setFilterDiet} diet_name={'filter_diet'} ></TypeDiet>
    </>)
  }

  const [edit_recipe, setEditRecipe] = useState(false);
  const [create_recipe, setCreateRecipe] = useState(false);

  var create_variables = { create_recipe, setCreateRecipe, edit_recipe, setEditRecipe };
  const [filter_text, setFilterText] = useState('');
  const [filter_meal, setFilterMeal] = useState('');
  const [filter_cuisine, setFilterCuisine] = useState('');
  const [filter_diet, setFilterDiet] = useState('');

  var filter_variables = {
    filter_text, setFilterText,
    filter_meal, setFilterMeal,
    filter_cuisine, setFilterCuisine,
    filter_diet, setFilterDiet
  };

  const pages_section = children;

  useEffect(() => {
    if (url.endsWith('/gmail.com?q=create') ){
      setCreateRecipe(true);
    }
  }, []);

  if (edit_recipe || create_recipe) {
    return (
      <React.StrictMode>
        <CreateContextProvider create_variables={create_variables} >
          <FilterContextProvider filter_variables={filter_variables} >
            <div id='recipe-page-section' className="  ">  {pages_section} </div>
          </FilterContextProvider>
        </CreateContextProvider>
      </React.StrictMode>
    )
  } else {
    return (
      <React.StrictMode>
        <CreateContextProvider create_variables={create_variables} >
          <FilterContextProvider filter_variables={filter_variables} >
            <div id="filter-menu-" className=" "   >
              <MenuHeader is_minimal={false}></MenuHeader>
              <SignInOrCreate setCreateRecipe={setCreateRecipe}></SignInOrCreate>
              <FilterRecipes></FilterRecipes>
            </div>
            <div id='recipe-page-section' className="  ">  {pages_section} </div>
            <FatHorz FatHorz="m-2"></FatHorz>

            <MenuFooter></MenuFooter>
          </FilterContextProvider>
        </CreateContextProvider>
      </React.StrictMode>
    )
  }
}






