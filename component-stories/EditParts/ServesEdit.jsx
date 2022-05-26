export { ServesEdit };

function ServesEdit({ the_serves, setServes }) {
  const servesChange = (event) => setServes(event.target.value);

  return (
    <div className="float-left w-4/12 pl-1">
      <div className="font-semibold">Serves</div>
      <input className="w-full pl-1 base-edit" type="text" onChange={servesChange} value={the_serves} />
    </div>
  );
}
