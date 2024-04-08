import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authData, setAuthData] = useState({
    isConnected: sessionStorage.getItem("isConnected"),
    walletSigner: JSON.parse(sessionStorage.getItem("walletSigner"))
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthData({
        isConnected: sessionStorage.getItem("isConnected"),
        walletSigner: JSON.parse(sessionStorage.getItem("walletSigner"))
      });
    };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
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
