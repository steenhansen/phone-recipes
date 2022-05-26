export { InternalView };

function InternalView({ internal, row_input_colour = "bg-row-input-colour-none" }) {
  return (
    <div className="float-left w-8/12">
      <div className="font-semibold"> Internal Meat Temp</div>
      <input className={` w-full base-view ${row_input_colour} `} type="text" defaultValue={internal} disabled />
    </div>
  );
}
