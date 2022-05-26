import { htmlDocument } from "../server-app/html-document";
import { serverRender, serverVarsToClient } from "../server-app/shared-client-server";

const server_vars_to_client = serverVarsToClient();
export const passToClient = server_vars_to_client;
export { renderHtmlOnServer as render };

async function renderHtmlOnServer(server_variables) {
  const pageHtml = serverRender(server_variables);
  const html_body = htmlDocument(pageHtml, server_variables);
  return html_body;
}
