import React from 'react'
import '../../tail-wind.css'

export { Page }

function Page(_my_vars) {
  return (
    <div>
      This program exists to help prepare multiple dishes for a meal using a phone
      in the kitchen. A list of all of my  <a href='/steenhansen1942/gmail.com'
        className="base-link">recipes</a>.

      <br /><br />
      To call up a list of your open recipes with timers, click on 'Kitchen' as below.
      <img className='mx-auto' src="kitchen.png" alt="Phone View" width="280" height="40" />
      <br />

      This will display chosen recipes such as the below sample of
      my <a href='/steenhansen1942/gmail.com/Rice/steenhansen1942/gmail.com/Whole%20Chicken/'
        className="base-link">whole chicken with rice</a> meal.

      <img className='mx-auto' src="phone.png" alt="Phone View" width="280" height="480" />

      <br />

      <div id="filter-bottom-" className="flex justify-between clear-left ">
        <div>
          <a href="https://github.com/steenhansen/phone-recipes" className="base-link">Program on GitHub</a>
        </div>
        <span>
          All icons are from -
          <a href="https://www.flaticon.com/" className="base-link" title="Free icons">Flaticon</a>
        </span>
      </div>

      <br />

      <div className="flex flex-wrap">

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="cow.png" alt="https://www.flaticon.com/free-icons/cow"
            title="Cow icons created by Freepik - Flaticon"
            width="68" height="68" />
          <div className="w-[68px]">
            Roast/Steak
            145f/65c
            Ground
            160f/70c
          </div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="hen.png" alt="www.flaticon.com/free-icons/chicken"
            title="Chicken icons created by Freepik - Flaticon"
            width="68" height="68" />
          <div className="w-[68px]  text-center">
            Poultry 165f/75c
          </div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="pig.png" alt="www.flaticon.com/free-icons/pig"
            title="Pig icons created by justicon - Flaticon"
            width="68" height="68" />
          <div className="w-[68px]">
            Pork 145f/65c
            Ham 145f/65c
            Precooked
            Ham 165f/75c
          </div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="rabbit.png" alt="www.flaticon.com/free-icons/rabbit"
            title="Rabbit icons created by Freepik - Flaticon"
            width="68" height="68" />
          <div className="w-[68px] text-center">
            Rabbit 160f/70c
          </div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="sheep.png" alt="www.flaticon.com/free-icons/sheep"
            title="Sheep icons created by Freepik - Flaticon"
            width="68" height="68" />
          <div className="w-[68px]">
            Mutton
            145f/65c
            Ground
            160f/70c
          </div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="deer.png" alt="www.flaticon.com/free-icons/deer"
            title="Deer icons created by Chattapat - Flaticon"
            width="68" height="68" />
          <div className="w-[68px]">
            Roast/Steak
            145f/65c
            Ground
            160f/70c
          </div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="bison.png" alt="www.flaticon.com/free-icons/bison"
            title="Bison icons created by Freepik - Flaticon"
            width="68" height="68" />
          <div className="w-[68px]">
            Roast/Steak
            145f/65c
            Ground
            160f/70c
          </div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="fish.png" alt="www.flaticon.com/free-icons/fish"
            title="Fish icons created by Those Icons - Flaticon"
            width="68" height="68" />
          <div className="w-[68px]">
            Salmon 125f
            Halibut 130f
            Lobster 140f
            Scallops 130f
            Shrimp 120f
          </div>
        </div>

      </div>
    </div>
  )
}

//   https://www.healthline.com/nutrition/meat-temperature#temperature-guide

