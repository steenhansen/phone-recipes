import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";
import { ROOT_ELEMENT_ID } from "../server-app/shared-client-server";
import { APP_TITLE, APP_DESCRIPTION } from "../import-2-require/common-2-import.js";

export { htmlDocument };

function headTitleDesc(server_variables) {
  const { documentProps } = server_variables;
  const app_title = (documentProps && documentProps.title) || APP_TITLE;
  const app_desc = (documentProps && documentProps.description) || APP_DESCRIPTION;
  return [app_title, app_desc];
}

function makeHead(server_variables) {
  const [app_title, app_desc] = headTitleDesc(server_variables);
  const documentHtml = `
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${app_desc}" />
        <title>${app_title}</title>`;
  const head_html = dangerouslySkipEscape(documentHtml);
  return head_html;
}

function htmlDocument(pageHtml, server_variables) {
  const escacpeHtml = dangerouslySkipEscape(pageHtml);
  const head_html = makeHead(server_variables);
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        ${head_html}
      </head>
      <body>
        <div id="${ROOT_ELEMENT_ID}">${escacpeHtml}</div>
      </body>
    </html>`;
  return {
    documentHtml,
    pageContext: {
      // We can add some `server_variables` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}
