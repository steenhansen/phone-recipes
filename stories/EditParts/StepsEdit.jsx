

export { StepsEdit }

function StepsEdit({ the_steps, setSteps }) {
  const stepsChange = (event) => setSteps(event.target.value);
  return (
    <div className=" mt-2 ">
      <span className="font-semibold" >Steps &amp; Directions</span> &nbsp;
      <textarea className='w-full base-edit pl-1 ' onChange={stepsChange} value={the_steps} />
    </div>
  )
}

