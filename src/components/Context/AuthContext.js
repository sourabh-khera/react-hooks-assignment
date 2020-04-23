import React, { createContext, useState } from 'react';


export const AuthContext = createContext({
  isAuth: false,
  login: () => {}
});


const AuthContextProvider  = (props) => {
  const [isAuth, setAuthStatus] = useState(false);
  const loginHandler = () => {
    setAuthStatus(true);
  }
  return (
    <AuthContext.Provider value={{isAuth, login: loginHandler}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;