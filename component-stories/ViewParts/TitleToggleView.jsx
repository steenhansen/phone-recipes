import { StartHorz, ThinHorz } from '../HorzBar'
import { testIdStrip } from '../../import-2-require/common-2-import';
export { TitleToggleView }

function TitleToggleView({ title, clickRecipeFlip }) {
  const test_id = testIdStrip(title) + '--title--toggle--';

  return (
    <div className="flex clear-both" >
      <div className="flex-none ">
        <StartHorz className="mt-4"></StartHorz>
        <a className="ml-1 text-lg font-bold cursor-pointer base-link hover:cursor-pointer"
          id={test_id}
          onClick={clickRecipeFlip} >{title}</a>
      </div>
      <div className="flex-auto pl-1">
        <ThinHorz className="mt-4"></ThinHorz>
      </div>
    </div>
  )
}


