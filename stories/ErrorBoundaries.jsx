import { vanillaPageContext } from '../import-2-require/common-2-import.js'
import { databasePost } from '../redux-store/ajax-calls.js'

export { possibleErrorBoundary,recordErrorBoundary }

function possibleErrorBoundary(boundary_mess, is_storybook = 'un-defined') {
  if (is_storybook === 'boundary-crash') {
    throw 'Storybook Boundary Crash -' + boundary_mess;
  }
}

function recordErrorBoundary(component_name, error) {
  const a_number_error_message = error;
  const browser_csrfToken = vanillaPageContext('shared_csrfToken');
  const browser_error = component_name + ' ' + a_number_error_message ;
  const a_react_error = { browser_error };
  databasePost('record-error', browser_csrfToken, a_react_error);
  return (
    <div>
      {component_name} Error - try refresh
    </div>
  )

}