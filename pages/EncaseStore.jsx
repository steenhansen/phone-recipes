import { PageSansMenu } from "./PageSansMenu";
import { PageWithMenu } from "./PageWithMenu";
export { EncaseStore };
import { ServerContextProvider } from "../server-app/serverBrowserContext";

import { objectLength } from "../import-2-require/common-2-import";

function EncaseStore({ server_variables }) {
  const num_params = objectLength(server_variables.routeParams);
  if (num_params > 2 || server_variables.url === "/about") {
    return (
      <ServerContextProvider server_variables={server_variables}>
        <PageSansMenu />
      </ServerContextProvider>
    );
  }
  return (
    <ServerContextProvider server_variables={server_variables}>
      <PageWithMenu />
    </ServerContextProvider>
  );
}
