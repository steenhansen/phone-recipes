import { userToUrl } from "../../import-2-require/common-2-import";
import { useServerContext } from '../../server-app/serverBrowserContext'
export { MenuHeader }

function MenuHeader({ is_minimal }) {
  const server_variables = useServerContext();
  const { url, shared_auth_email } = server_variables;
  const user_url = userToUrl(shared_auth_email)

  if (shared_auth_email === '') {
    if (is_minimal) {
      return (
        <div id="-menu-logged-out-minimal-" className="text-center ">
          <a href="/" className="base-link">All Recipes</a>
        </div>
      )
    } else if (url === '/') {
      return (
        <>
          <div id="-filter-top-" className="flex justify-between ">
            &nbsp;
          </div>
        </>
      )
    } else {
      return (
        <>
          <div id="-filter-top-" className="flex justify-between ">
            <div>
              <a href="/" className="base-link">All Recipes</a>
            </div>
            &nbsp;
          </div>
        </>
      )
    }
  } else {
    if (is_minimal) {
      return (
        <div id="-filter-top-" className="flex justify-between ">
          &nbsp;
          <div>
            <a href="/" className="base-link">All Recipes</a>
          </div>
          <a id="--my--recipes--" className="base-link" href={user_url}>My Recipes</a>
        </div>
      )
    } else if (url === user_url) {  // user looking at own
      return (
        <a id="-menu-logged-out-" href="/" className="base-link">All Recipes</a>
      )
    } else {
      return (
        <div id="-filter-top-" className="flex justify-between ">
          &nbsp;
          <a id="--my--recipes--" className="base-link" href={user_url}>My Recipes</a>
        </div>
      )
    }
  }
}
