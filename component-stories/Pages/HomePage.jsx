import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { withErrorBoundary } from 'react-error-boundary'
import { HomeRecipes } from '../HomeRecipes'
import { possibleErrorBoundary, recordErrorBoundary } from '../ErrorBoundaries'

export { HomePageBoundary }

function HomePageFallback({ error }) {
  const error_jsx = recordErrorBoundary('HomePage', error);
  return error_jsx;
}

// NB the error entered in React Components Error Boundary state.error must be a number or null, not a string?
const HomePageBoundary = withErrorBoundary(HomePage, {
  FallbackComponent: HomePageFallback,
  onError(error, info) { }   // NB this does not seem to get called, so use fallback to saved error to db
})

function HomePage({ is_storybook, is_story_book_environment = false }) {
  possibleErrorBoundary('HomePage', is_storybook);

  const current_recipes = useSelector((recipe_store2) => recipe_store2.current_recipes)
  const hide_all_recipes = Array(current_recipes.length).fill(false);
  const [is_visible_array, setVisibleRecipes] = useState(hide_all_recipes);
  return (
    <div className="inline ">
      <HomeRecipes is_story_book_environment={is_story_book_environment}
        is_visible_array={is_visible_array}
        setVisibleRecipes={setVisibleRecipes} ></HomeRecipes>
    </div>
  )

}

