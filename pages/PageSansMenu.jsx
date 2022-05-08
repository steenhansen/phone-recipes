import { MenuHeader } from '../stories/MenuParts/MenuHeader'
import { FakeTest } from '../stories/FakeTest'
import { useServerContext } from '../server-app/serverBrowserContext'

export { PageSansMenu }

function PageSansMenu() {
  const server_variables = useServerContext()
  const { Page } = server_variables;
  return (
     <div  className="max-w-[550px]" >
      <MenuHeader is_minimal={true}></MenuHeader>
      <Page />
      <FakeTest/>
      </div>
  )
}