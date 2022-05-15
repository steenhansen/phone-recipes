
export { MinutesView }

function MinutesView({minutes, row_input_colour='bg-row-input-colour-none' }){
  return (
    <div className="float-left w-4/12 pl-2">
      <div className="font-semibold">Timer Min</div>
      <input className={`w-full  base-view  ${row_input_colour} `} type="text"  defaultValue={minutes} disabled/>
      
    </div>
  )
}
