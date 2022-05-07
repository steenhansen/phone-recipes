
export { StepsView }

function StepsView({ steps, row_input_colour='bg-row-input-colour-none' }) {
  const num_rows = (steps.match(/\n/g) || []).length + 1;
  return (
    <div className=" mt-2 clear-both ">
      <span className="font-semibold">Steps &amp; Directions</span> 
      <textarea className={` w-full base-view  ${row_input_colour} `} rows={num_rows} defaultValue={steps} disabled />
    </div>
  )
}

