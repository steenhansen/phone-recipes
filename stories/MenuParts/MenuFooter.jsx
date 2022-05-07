import { useServerContext } from '../../server-app/serverBrowserContext'

export { MenuFooter }

function MenuFooter() {

  const server_variables = useServerContext();
  const { shared_auth_email } = server_variables;

  if (shared_auth_email === '') {
    return (
      <div id="filter-bottom-" className="flex   justify-between clear-left ">
        <div>
          <a href="/about" className="base-link">About</a>
        </div>
      </div>
    )
  }
  return (
    <div id="filter-bottom-" className="flex   justify-between clear-left ">
      <div>
        <a href="/about" className="base-link">About</a>
      </div>
           <a href="/logout-google" className="base-link float-right">Sign Out</a>
    </div>
  )
}
