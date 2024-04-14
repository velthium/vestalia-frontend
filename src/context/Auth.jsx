import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authData, setAuthData] = useState({
    desmosProfile: JSON.parse(sessionStorage.getItem("desmosProfile")),
    walletSigner: JSON.parse(sessionStorage.getItem("walletSigner"))
  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.array.isRequired
};
