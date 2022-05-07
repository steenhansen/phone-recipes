import { StartHorz, ThinHorz } from '../HorzBar'
import { testIdStrip } from '../../import-2-require/common-2-import';

export { TitleToggleView }

//     style={{display:title_display}}
function TitleToggleView({ title, clickRecipeFlip }) {
  const test_id = testIdStrip(title);


  return (
    <div className="flex clear-both" >
      <div className="flex-none ">
        <StartHorz className="mt-4"></StartHorz>
        <a className="base-link hover:cursor-pointer  cursor-pointer font-bold text-lg ml-1"
              id={test_id}
          onClick={clickRecipeFlip} >{title}</a>
      </div>
      <div className="flex-auto  pl-1">
        <ThinHorz className="mt-4"></ThinHorz>
      </div>
    </div>
  )
}


