import React, { useState } from 'react'
import { ButtonBase } from '../ButtonBase'
import { SHORTEST_STRING_LEN } from "../../import-2-require/common-2-import.js";

export { IngredientAdd }

function IngredientAdd({ clickAddIngred }) {
  const [add_disabled, setAddDisabled] = useState(true);
  const [add_ingredient, setAddIngredient] = useState('');
  const [add_amount, setAddAmount] = useState('');

  const addClick = (event) => {
    clickAddIngred(add_ingredient, add_amount);
    setAddDisabled(true)
    setAddIngredient('');
    setAddAmount('');
  }

  const disableAdd = (an_ingredient, an_amount) => {
    const trimmed_ingredient = an_ingredient.trim();
    const trimmed_amount = an_amount.trim();
    // below commented out checks that there must be an non-empty amount
    // const disable_add = trimmed_ingredient.length < SHORTEST_STRING_LEN || trimmed_amount.length < SHORTEST_STRING_LEN;
    const disable_add = trimmed_ingredient.length < SHORTEST_STRING_LEN;
    return disable_add;
  }

  const addIngredientChange = (event) => {
    const ingredient_text = event.target.value
    setAddIngredient(ingredient_text);
    if (disableAdd(ingredient_text, add_amount)) {
      setAddDisabled(true);
    } else {
      setAddDisabled(false);
    }
  }
  const addAmountChange = (event) => {
    const amount_text = event.target.value
    setAddAmount(amount_text);
    if (disableAdd(add_ingredient, amount_text)) {
      setAddDisabled(true);
    } else {
      setAddDisabled(false);
    }
  }

  const the_key = 'ingredient-Add';
  return (
    <div key={the_key} className="pb-4" >

      <div className=" w-[25px] mr-1 float-left clear-both pb-2">
        &nbsp;
      </div>

      <div className="float-left w-6/12 mr-1">
        <input maxLength="26" className='w-full  base-edit'
          onChange={addIngredientChange}
          placeholder="Lukewarm milk..." type="text" value={add_ingredient} />
      </div>

      <div className='float-left w-3/12'>
        <input maxLength="12" className='w-full  base-edit'
          onChange={addAmountChange}
          placeholder="2 cups..." type="text" value={add_amount} />
      </div>

      <div className=" w-[30px] mr-1 float-right  ">
        <ButtonBase className="py-0 " is_disabled={add_disabled}  >
          <a onClick={addClick}>Add</a>
        </ButtonBase>
      </div>

    </div>
  )
}

