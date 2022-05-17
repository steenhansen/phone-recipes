import { useRef, useEffect } from 'react'

export { TitleEdit }

function TitleEdit({ the_title, setTitle }) {
  const input_ref = useRef();

  useEffect(() => {
    if (the_title === '') {
      input_ref.current.focus();
    }
  }, []);

  const titleChange = (event) => {
    const cur_title = event.target.value;
    setTitle(cur_title);
  };

  return (
    <div id="-time-and-serves-" className="mt-2 ">
      <div className="my-1">
        <span className="w-2/12 pr-2 font-semibold cursor-help hover:cursor-help" 
        title='Alphanumeric, dash, space &amp; underscore only'>Name</span>
        <input ref={input_ref} className='w-10/12 pl-1 base-edit' type="text"
          id="_recipe-title_"
          onChange={titleChange} value={the_title} />
      </div>
    </div>
  )
}


