import React from "react";
import { FilterMenu } from "./FilterMenu";
import { ServerContextProvider } from "../../server-app/serverBrowserContext";

export default {
  title: "Menu/FilterMenu",
  component: FilterMenu,
};

export const LoggedOut = ({ children }) => {
  const server_variables = { shared_auth_email: "", url: "/" };
  return (
    <ServerContextProvider server_variables={server_variables}>
      <FilterMenu children={children}></FilterMenu>
    </ServerContextProvider>
  );
};

export const LoggedIn = ({ children }) => {
  const server_variables = { shared_auth_email: "v8d8e9@gmail.com", url: "/" };
  return (
    <ServerContextProvider server_variables={server_variables}>
      <FilterMenu children={children}></FilterMenu>
    </ServerContextProvider>
  );
};
