import { FatHorz } from '../HorzBar'
import { ID_SEPARATOR, userToUrl } from "../../import-2-require/common-2-import";
import { ButtonBase } from '../ButtonBase'
import { useDispatch } from 'react-redux'

import { useServerContext } from '../../server-app/serverBrowserContext'
import { databasePost } from '../../redux-store/ajax-calls.js'


export { CookRemarks }

function RemarkRow(a_remark) {

  const server_variables = useServerContext();


  const dispatch = useDispatch()


  const { _id, by } = a_remark;

  async function clickCutRecipe(event) {
    const csrf_token = server_variables.shared_csrfToken;
    const delete_res = await databasePost('remove-comment', csrf_token, { _id });
    if (delete_res instanceof Error) {
      dispatch({ type: 'ajax-error', payload: delete_res }); 
    } else {
      dispatch({ type: 'remove-comment', payload: _id });
    }
    return delete_res;
  }

  const user_url = userToUrl(by);
  const the_parts = _id.split(ID_SEPARATOR);
  const the_key = 'cut_' + _id;
  const [_recipe_id, recipe_title, _cooks_email, your_comment] = the_parts;
  const phone_view_url = user_url + '/' + recipe_title;
  return (
    <div key={the_key} className="m-1">


      <ButtonBase className="    cut-red"  >
        <a onClick={clickCutRecipe}>Cut</a>
      </ButtonBase>

      <a className="base-link ml-1" href={phone_view_url}>{recipe_title}</a> -
      <span className="italic">{your_comment}</span>
    </div>
  )
}

function CookRemarks({ cooks_remarks }) {
  const fade_gray = cooks_remarks.length === 0 ? "text-slate-400" : '';
  const the_remarks = cooks_remarks.map(a_remark => RemarkRow(a_remark));
  return (
    <>
      <FatHorz className="clear-both mt-53"></FatHorz>
      <div className={`font-semibold  ${fade_gray}`}>Comments You Made</div>
      <div className="ml-4">
        {the_remarks}
      </div>
    </>
  )
}