import React, { useState } from 'react'
import { ButtonBase } from '../ButtonBase'
import { useServerContext } from '../../server-app/serverBrowserContext'
import { SHORTEST_STRING_LEN, safeStrip } from "../../import-2-require/common-2-import";
import { useDispatch } from 'react-redux'
import { databasePost } from '../../redux-store/ajax-calls.js'

export { CommentAdd }

function CommentAdd({ _id, used_comments }) {
  const dispatch = useDispatch();
  const recipe_id = _id
  const server_variables = useServerContext()
  const { shared_auth_email, shared_csrfToken } = server_variables;
  const [remark_text, setRemarkText] = useState('');
  const commentChange = (event) => setRemarkText(event.target.value);

  const onCommentClick = async (event) => {
    const remark = safeStrip(remark_text);
    if (remark.length > 0) {
      const comment_data = { recipe_id, by: shared_auth_email, remark };
      const comment_add = await databasePost('add-comment', shared_csrfToken, comment_data);
      if (comment_add instanceof Error) {
        dispatch({ type: 'ajax-error', payload: comment_add }); 
      } else {
        dispatch({ type: 'add-comment', payload: comment_data });
      }
    }
  };

  let is_disabled = true;
  const trimmed_remark = remark_text.trim();
  if (shared_auth_email === '') {
    return (
      <ButtonBase className=" float-left mr-2 mt-2 ">
        <a href="/login/federated/google">Sign in with Google to Comment</a>
      </ButtonBase>
    )
  } else if (trimmed_remark.length > SHORTEST_STRING_LEN) {
    if (used_comments.indexOf(trimmed_remark)) {
      is_disabled = false;
    }
  }

  return (
    <div className=" mt-2 ">
      <ButtonBase className="base-button ml-2 mr-2" is_disabled={is_disabled}>
        <a  id="_new-comment-add_"  onClick={onCommentClick}>Add Comment</a>
      </ButtonBase>
      <input id="_new-comment-text_" onChange={commentChange} className=' w-7/12  bg-active-colour' type="text"
        value={remark_text} placeholder="New recipe comment ..." />
    </div>
  )
}
