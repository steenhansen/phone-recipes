export { HeatEdit };

function HeatEdit({ the_time, setTime }) {
  const timeChange = (event) => setTime(event.target.value);

  return (
    <div className="float-left w-8/12">
      <div className="font-semibold">Heat &amp; Time</div>
      <input className="w-full pl-1 base-edit" type="text" onChange={timeChange} value={the_time} />
    </div>
  );
}
