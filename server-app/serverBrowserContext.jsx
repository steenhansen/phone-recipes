import React, { useContext } from 'react';

export { ServerContextProvider, FilterContextProvider, CreateContextProvider };
export { useServerContext, useFilterContext, useCreateContext };

const Server_Context = React.createContext('server-context');
function ServerContextProvider({ server_variables, children }) {
  return <Server_Context.Provider value={server_variables}>{children}</Server_Context.Provider>;
}
function useServerContext() {
  const server_variables = useContext(Server_Context);
  return server_variables;
}

const Filter_Context = React.createContext('filter-context');
function FilterContextProvider({ filter_variables, children }) {
  return <Filter_Context.Provider value={filter_variables}>{children}</Filter_Context.Provider>;
}
function useFilterContext() {
  const filter_variables = useContext(Filter_Context);
  return filter_variables;
}

const Create_Context = React.createContext('create-context');
function CreateContextProvider({ create_variables, children }) {
  return <Create_Context.Provider value={create_variables}>{children}</Create_Context.Provider>;
}
function useCreateContext() {
  const create_variables = useContext(Create_Context);
  return create_variables;
}

