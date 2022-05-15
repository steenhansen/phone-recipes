import React from 'react'

export { MinutesEdit }

function MinutesEdit({ the_minutes, setMinutes }) {

  const minutesChange = (event) => {
    const possible_minutes = event.target.value;
    let digits_only = possible_minutes.match(/\d+/);
    if (digits_only) {
      setMinutes(+digits_only);
    } else {
      setMinutes(0);
    }
  }
  let minutes_display = the_minutes;
  if (the_minutes == 0) {
    minutes_display = ''
  }

  return (
    <div className="w-4/12 float-left  pl-1">
      <div className="font-semibold" >Timer Min</div>
      <input className='pl-1 w-full base-edit' type="text" onChange={minutesChange} value={minutes_display} />
    </div>
  )
}


