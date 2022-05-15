import React from 'react';
import { useServerContext } from '../server-app/serverBrowserContext'

import { FAKE_TEST_GMAIL } from '../import-2-require/common-2-import'

export { FakeTest }

const FakeTest = () => {
  const server_variables = useServerContext()
  const { shared_auth_email } = server_variables;

  if (shared_auth_email === FAKE_TEST_GMAIL) {
    return (
      <div id="FAKE_TEST_GMAIL"></div>
    );
  }
  return (
    <></>
  );
};
