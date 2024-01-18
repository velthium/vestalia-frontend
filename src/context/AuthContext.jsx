import React, { createContext, useContext, useState } from "react";

const AuthContext  = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [WalletSigner, setWalletSigner] = useState(null);

  return (
    <AuthContext.Provider value={{ isConnected, setIsConnected, WalletSigner, setWalletSigner }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };