
export { MealCuisineDiet }

function capitlFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function MealCuisineDiet({ meal_cuisine_diet, ...props }) {
  const { meal, cuisine, diet } = meal_cuisine_diet
  let recipe_types = '';
  if (meal) {
    recipe_types = capitlFirst(meal) + ' / ';
  }
  if (cuisine) {
    recipe_types = recipe_types + capitlFirst(cuisine) + ' / ';
  }
  if (diet) {
    recipe_types = recipe_types + capitlFirst(diet);
  }
  const end_space_slash = new RegExp(/ \/ $/);
  const with_no_extra_slash = recipe_types.replace(end_space_slash, '');
  if (with_no_extra_slash === '') {
    return '';
  }
  if (props.children) {
    return (
      <div className="">
        <div className='text-center'>
          {with_no_extra_slash}
        </div>
        <div className='text-center'>
          <span className="text-sm italic ">from</span>  {props.children}
        </div>
      </div>
    )
  }

  return (
    <div className="">
      {with_no_extra_slash}
    </div>
  )
}

