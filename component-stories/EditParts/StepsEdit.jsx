
export { StepsEdit }

function StepsEdit({ the_steps, setSteps }) {
  const stepsChange = (event) => setSteps(event.target.value);
  const num_rows = (the_steps.match(/\n/g) || []).length + 1;
  return (
    <div className="mt-2 ">
      <span className="font-semibold" >Steps &amp; Directions</span> &nbsp;
      <textarea className='w-full pl-1 base-edit 'rows={num_rows}  onChange={stepsChange} value={the_steps} />
    </div>
  )
}

