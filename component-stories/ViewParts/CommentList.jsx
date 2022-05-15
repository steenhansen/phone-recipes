import { ID_SEPARATOR, userToUrl, testIdStrip } from "../../import-2-require/common-2-import";

export { CommentList }

function CommentRow(a_comment) {
  const the_parts = a_comment.split(ID_SEPARATOR)
  const [_id, _recipe, email, remark] = the_parts
  const the_key = 'comment_row_' + a_comment;
  const cook_page = userToUrl(email);
  const remark_test_id = testIdStrip(remark) + '--comment--';
  return (
    <div key={the_key}>
      "<span id={remark_test_id}>{remark}</span>"<span className="text-sm italic">- commented by </span>
      <a className="text-sm italic base-link " href={cook_page}>{email}</a>
    </div>
  )
}

function CommentList({ comments }) {
  if (typeof comments === 'object' && comments.length > 0) {
    const the_comments = comments.map(a_comment => CommentRow(a_comment));
    return (
      <>
        <span className="font-semibold">Recipe Comments:</span>
        <div className="ml-4">
          {the_comments}
        </div>
      </>
    )
  }
  return '';
}