import React, { useState, useContext } from "react";

// create context
const AuthContext = React.createContext();

/*  I have set up react context which sets up global auth value 
This is important - as it is needed throughout the application for protected routes
and for conditional rendering of components 
*/
/* 
The use context function returns the authContext - this means we can access
in this case both the auth and setAuth functions and set it globally */
export function useAuth() {
  return useContext(AuthContext);
}

// Set up the auth provider - this gets wrapped around the main app component

export function AuthProvider(props) {
  const [auth, setAuth] = useState(false);

  const value = {
    auth,
    setAuth,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
