export { TypeCuisine }

function TypeCuisine({ the_cuisine, setCuisine, cuisine_name }) {
  const cuisineChange = (event) => setCuisine(event.target.value);
  return (
    <div id="dddd" className="mt-2  clear-both">
      <div id="ccc" className="mt-2 float-left font-semibold mb-5" >Cuisine &nbsp;  </div>
      <div id="bart" className="mt-2 clear-right">

        <label className='base-radio-label'>
          <input onChange={cuisineChange} className='mr-1' type="radio" name={cuisine_name}
            value="chinese" checked={the_cuisine === "chinese"} /> Chinese </label>

        <label className='base-radio-label'>
          <input onChange={cuisineChange} className='mr-1' type="radio" name={cuisine_name}
            value="indian" checked={the_cuisine === "indian"} /> Indian </label>

        <label className='base-radio-label'>
          <input onChange={cuisineChange} className='mr-1' type="radio" name={cuisine_name}
            value="japanese" checked={the_cuisine === "japanese"} /> Japanese </label>

        <label className='base-radio-label'>
          <input onChange={cuisineChange} className='mr-1' type="radio" name={cuisine_name}
            value="mexican" checked={the_cuisine === "mexican"} /> Mexican </label>

        <label className='base-radio-label'>
          <input onChange={cuisineChange} className='mr-1' type="radio" name={cuisine_name}
            value="italian" checked={the_cuisine === "italian"} /> Italian </label>

        <label className='base-radio-label'>
          <input onChange={cuisineChange} className='mr-1' type="radio" name={cuisine_name}
            value="french" checked={the_cuisine === "french"} /> French </label>

        <label className='base-radio-label'>
          <input onChange={cuisineChange} className='mr-1' type="radio" name={cuisine_name}
          value="" checked={the_cuisine === ""} />n/a</label>
      </div>
    </div>
  )
}