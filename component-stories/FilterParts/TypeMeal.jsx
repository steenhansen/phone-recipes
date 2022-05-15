
export { TypeMeal }

function TypeMeal({ the_meal, setMeal, meal_name }) {
  const mealChange = (event) => setMeal(event.target.value);
  return (
    <div className="mt-2">
      <div className="float-left mt-2 mb-5 font-semibold" >Meal &nbsp;  </div>
      <div className="clear-right mt-2">
        <label className='base-radio-label'>
          <input onChange={mealChange} className='mr-1' type="radio" name={meal_name}
            value="breakfast" checked={the_meal === "breakfast"} /> Breakfast </label>

        <label className='base-radio-label'>
          <input onChange={mealChange} className='mr-1' type="radio" name={meal_name}
            value="brunch" checked={the_meal === "brunch"} /> Brunch </label>

        <label className='base-radio-label'>
          <input onChange={mealChange} className='mr-1' type="radio" name={meal_name}
            value="lunch" checked={the_meal === "lunch"} /> Lunch </label>

        <label className='base-radio-label'>
          <input onChange={mealChange} className='mr-1' type="radio" name={meal_name}
            value="supper" checked={the_meal === "supper"} /> Supper </label>

        <label className='base-radio-label'>
          <input onChange={mealChange} className='mr-1' type="radio" name={meal_name}
            value="dessert" checked={the_meal === "dessert"} /> Dessert </label>

        <label className='base-radio-label'>
          <input onChange={mealChange} className='mr-1' type="radio" name={meal_name}
            value="snack" checked={the_meal === "snack"} /> Snack </label>

        <label className='base-radio-label'>
          <input onChange={mealChange} className='mr-1' type="radio" name={meal_name}
            value="" checked={the_meal === ""} /> n/a </label>
      </div>
    </div>
  )

}