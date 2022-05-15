export { HeatEdit }

function HeatEdit({ the_time, setTime }) {
  const timeChange = (event) => setTime(event.target.value);

  return (
    <div className="w-8/12 float-left">
      <div className="font-semibold" >Heat &amp; Time</div>
      <input className='pl-1 w-full base-edit' type="text" onChange={timeChange} value={the_time} />
    </div>
  )
}

