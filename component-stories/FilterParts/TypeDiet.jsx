
export { TypeDiet }

function TypeDiet({ the_diet, setDiet, diet_name }) {
  const dietChange = (event) => setDiet(event.target.value);
  return (
    <div className="clear-both mt-2">
      <div className="float-left mt-2 mb-5 font-semibold"  >Diet  &nbsp;  </div>
      <div className="clear-right mt-2">
        <div className="mt-2 max-w-[510px] ">

          <label className='base-radio-label'>
            <input onChange={dietChange} className='mr-1' type="radio" name={diet_name}
              value="omnivore" checked={the_diet === "omnivore"} /> Omnivore </label>

          <label className='base-radio-label'>
            <input onChange={dietChange} className='mr-1' type="radio" name={diet_name}
              value="vegan" checked={the_diet === "vegan"} /> Vegan </label>

          <label className='base-radio-label'>
            <input onChange={dietChange} className='mr-1' type="radio" name={diet_name}
              value="vegetarian" checked={the_diet === "vegetarian"} /> Vegetarian </label>

          <label className='base-radio-label'>
            <input onChange={dietChange} className='mr-1' type="radio" name={diet_name}
              value="halal" checked={the_diet === "halal"} /> Halal </label>

          <label className='base-radio-label'>
            <input onChange={dietChange} className='mr-1' type="radio" name={diet_name}
              value="kosher" checked={the_diet === "kosher"} /> Kosher </label>

          <label className='base-radio-label'>
            <input onChange={dietChange} className='mr-1' type="radio" name={diet_name}
              value="" checked={the_diet === ""} /> n/a </label>
        </div>
      </div>
    </div>

  )
}