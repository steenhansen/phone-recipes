import { useRef, useEffect, useCallback, useState } from "react";
import debounce from "lodash.debounce";

export { TextFilter };

function TextFilter({ filter_text, setFilterText }) {
  const [the_localFilter, setLocalFilter] = useState(filter_text);
  const local_filter_ref = useRef();

  useEffect(() => local_filter_ref.current.focus(), []);

  const filterTextChange = (local_text) => setFilterText(local_text);

  // https://dmitripavlutin.com/react-throttle-debounce/
  const debounced_filterChange = useCallback(debounce(filterTextChange, 500), []);

  const localFilterChange = (event) => {
    const local_text = event.target.value;
    setLocalFilter(local_text);
    debounced_filterChange(local_text);
  };

  return (
    <div>
      <span className="font-semibold">Search</span> &nbsp;
      <input ref={local_filter_ref} className="pl-1 w-30 base-edit " type="text" onChange={localFilterChange} value={the_localFilter} />
    </div>
  );
}
