import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authData, setAuthData] = useState({
    desmosProfile: JSON.parse(sessionStorage.getItem("desmosProfile")),
    walletSigner: JSON.parse(sessionStorage.getItem("walletSigner"))
  });

  useEffect(() => {
    const handleKeplrChange = () => {
      setAuthData({
        desmosProfile: JSON.parse(sessionStorage.getItem("desmosProfile")),
        walletSigner: JSON.parse(sessionStorage.getItem("walletSigner"))
      });
    };

    window.addEventListener("storage", handleKeplrChange);

    return () => {
      window.removeEventListener("storage", handleKeplrChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.array.isRequired
};

export const useAuth = () => useContext(AuthContext);
