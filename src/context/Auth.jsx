import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isConnected: sessionStorage.getItem('isConnected'),
    walletSigner: JSON.parse(sessionStorage.getItem('walletSigner')),
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthData({
        isConnected: sessionStorage.getItem('isConnected'),
        walletSigner: JSON.parse(sessionStorage.getItem('walletSigner')),
      });
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);