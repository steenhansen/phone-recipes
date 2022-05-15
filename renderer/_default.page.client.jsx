import { getPage } from 'vite-plugin-ssr/client';
import { clientRender, ROOT_ELEMENT_ID } from '../server-app/shared-client-server';

browserHydrate(ROOT_ELEMENT_ID);

async function browserHydrate(root_element_id) {
  const server_variables = await getPage();
  clientRender(server_variables, root_element_id);
}
