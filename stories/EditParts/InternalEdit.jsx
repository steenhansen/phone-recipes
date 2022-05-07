export { InternalEdit }

function InternalEdit({ the_internal, setInternal }) {
  const internalChange = (event) => setInternal(event.target.value);

  return (
    <div className="w-8/12 float-left">
      <div className="font-semibold" >Internal Meat Temp</div>
      <input className='pl-1 w-full base-edit' type="text" onChange={internalChange} value={the_internal} />
    </div>
  )


}

