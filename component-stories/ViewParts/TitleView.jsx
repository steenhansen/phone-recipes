import { StartHorz, ThinHorz } from '../HorzBar'

export { TitleView }

function TitleView({ title, clickRecipeFlip }) {
  return (
    <div className="flex clear-both" >
      <div className="flex-none ">
        <StartHorz className="mt-4"></StartHorz>
        <a className="ml-1 text-lg font-bold cursor-pointer base-link hover:cursor-pointer"
         onClick={clickRecipeFlip} >{title}</a>
      </div>
      <div className="flex-auto pl-1">
        <ThinHorz className="mt-4"></ThinHorz>
      </div>
    </div>
  )

}


