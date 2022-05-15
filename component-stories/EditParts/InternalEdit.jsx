export { InternalEdit }

function InternalEdit({ the_internal, setInternal }) {
  const internalChange = (event) => setInternal(event.target.value);

  return (
    <div className="float-left w-8/12">
      <div className="font-semibold" >Internal Meat Temp</div>
      <input className='w-full pl-1 base-edit' type="text" onChange={internalChange} value={the_internal} />
    </div>
  )

}

