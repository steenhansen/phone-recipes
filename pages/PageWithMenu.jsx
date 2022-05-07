import { FilterMenu } from '../stories/MenuParts/FilterMenu'
import { FakeTest } from '../stories/FakeTest'

import { useServerContext } from '../server-app/serverBrowserContext'
export { PageWithMenu }

function PageWithMenu() {
    const server_variables = useServerContext();
    const { Page, pageProps } = server_variables;

    if (pageProps?.is404) {
        return (
            <div className="max-w-[550px]" >
                Page does not exist.
                <br /><br />
                <a href="/">Home</a>
            </div>
        )
    }

    return (
        <div className="max-w-[550px]" >
            <FilterMenu  >
                <Page />
            </FilterMenu>
            <FakeTest/>
        </div>
    )
}