import React from "react";
import "../../tail-wind.css";

export { Page };

function Page(_my_vars) {
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="flex-auto ml-1 text-xs w-[130px]">1 lb = 0.45 kg</div>
        <div className="flex-auto ml-1 text-xs w-[130px]">5 ml = 1 teaspoon</div>
        <div className="flex-auto ml-1 text-xs w-[130px]">2.2 lbs = 1 kg</div>
        <div className="flex-auto ml-1 text-xs w-[130px]">15 ml = tablespoon</div>
        <div className="flex-auto ml-1 text-xs w-[130px]">1 lb = 2 cups = 16 oz</div>
        <div className="flex-auto ml-1 text-xs w-[130px]">30 ml = 1 oz</div>
        <div className="flex-auto ml-1 text-xs w-[130px]">1 qt = 4 cups = 0.95 L</div>
        <div className="flex-auto ml-1 text-xs w-[130px]">240 ml = 1 cup</div>
      </div>
      <br />
      <div className="flex flex-wrap">
        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="cow.png" alt="https://www.flaticon.com/free-icons/cow" title="Cow icons created by Freepik - Flaticon" width="68" height="68" />
          <div className="w-[68px]">Roast/Steak 145f/65c Ground 160f/70c</div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="hen.png" alt="www.flaticon.com/free-icons/chicken" title="Chicken icons created by Freepik - Flaticon" width="68" height="68" />
          <div className="w-[68px]  text-center">Poultry 165f/75c</div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="pig.png" alt="www.flaticon.com/free-icons/pig" title="Pig icons created by justicon - Flaticon" width="68" height="68" />
          <div className="w-[68px]">Pork 145f/65c Ham 145f/65c Precooked Ham 165f/75c</div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="rabbit.png" alt="www.flaticon.com/free-icons/rabbit" title="Rabbit icons created by Freepik - Flaticon" width="68" height="68" />
          <div className="w-[68px] text-center">Rabbit 160f/70c</div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="sheep.png" alt="www.flaticon.com/free-icons/sheep" title="Sheep icons created by Freepik - Flaticon" width="68" height="68" />
          <div className="w-[68px]">Mutton 145f/65c Ground 160f/70c</div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="deer.png" alt="www.flaticon.com/free-icons/deer" title="Deer icons created by Chattapat - Flaticon" width="68" height="68" />
          <div className="w-[68px]">Roast/Steak 145f/65c Ground 160f/70c</div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="bison.png" alt="www.flaticon.com/free-icons/bison" title="Bison icons created by Freepik - Flaticon" width="68" height="68" />
          <div className="w-[68px]">Roast/Steak 145f/65c Ground 160f/70c</div>
        </div>

        <div className="flex-auto mb-2 text-xs font-thin">
          <img src="fish.png" alt="www.flaticon.com/free-icons/fish" title="Fish icons created by Those Icons - Flaticon" width="68" height="68" />
          <div className="w-[68px]">Salmon 125f Halibut 130f Lobster 140f Scallops 130f Shrimp 120f</div>
        </div>
      </div>
      This program exists to help prepare multiple dishes for a meal using a phone in the kitchen. A list of my online{" "}
      <a href="/steenhansen1942/gmail.com" className="base-link">
        recipes
      </a>
      .
      <br />
      <br />
      To call up a list of your open recipes with timers, click on 'Kitchen' as below.
      <img className="mx-auto" src="about-user.png" alt="User View" width="278" height="624" />
      <br />
      This will display the two open recipes such as the below sample of my{" "}
      <a href="/steenhansen1942/gmail.com/Pork%20Roast/steenhansen1942/gmail.com/Rice" className="base-link">
        Pork Roast with rice
      </a>{" "}
      meal.
      <img className="mx-auto" src="about-kitchen.png" alt="Kitchen View" width="278" height="586" />
      <br />
      <div id="filter-bottom-" className="flex justify-between clear-left ">
        <div>
          <a href="https://github.com/steenhansen/phone-recipes" className="base-link">
            Program on GitHub
          </a>
        </div>
        <span>
          All icons are{" "}
          <a href="https://www.flaticon.com/" className="base-link" title="Free icons">
            Flaticons
          </a>
        </span>
      </div>
      <br />
      <div className="leading-3">
        <a href="https://www.flaticon.com/free-icons/bison" title="Bison icons" className="flaticon">
          Bison icon created by Freepik - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/chicken" title="Chicken icons" className="flaticon-2">
          Chicken icon created by Freepik - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/cow" title="Cow icons" className="flaticon">
          Cow icon created by Freepik - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/deer" title="Deer icons" className="flaticon-2">
          Deer icon created by Chattapat - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/fish" title="Fish icons" className="flaticon">
          Fish icon created by Those Icons - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/food" title="food icons" className="flaticon-2">
          Food icons created by Freepik - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/pig" title="Pig icons" className="flaticon">
          Pig icon created by justicon - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/rabbit" title="Rabbit icons" className="flaticon-2">
          Rabbit icon created by Freepik - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/sheep" title="Sheep icons" className="flaticon">
          Sheep icon created by Freepik - Flaticon
        </a>
        &nbsp;
        <a href="https://www.flaticon.com/free-icons/tap" title="Tap icons" className="flaticon-2">
          Tap icon created by Zlatko Najdenovski - Flaticon
        </a>
        node-19.js.yml
      </div>
    </div>
  );
}

//   https://www.healthline.com/nutrition/meat-temperature#temperature-guide
