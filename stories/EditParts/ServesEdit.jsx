export { ServesEdit }

function ServesEdit({ the_serves, setServes }) {
  const servesChange = (event) => setServes(event.target.value);

  return (
    <div className="w-4/12 float-left  pl-1">
      <div className="font-semibold" >Serves</div>
      <input className='pl-1 w-full base-edit' type="text" onChange={servesChange} value={the_serves} />
    </div>
  )
}


