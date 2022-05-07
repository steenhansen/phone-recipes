

export { ServesView }


function ServesView({ serves , row_input_colour='bg-row-input-colour-none' }) {
  return (
    <div className="w-4/12 float-left  pl-2">
      <div className="font-semibold">Serves</div>
      <input className={`w-full  base-view ${row_input_colour} `}  type="text" defaultValue={serves} disabled />
    </div>
  )
}


