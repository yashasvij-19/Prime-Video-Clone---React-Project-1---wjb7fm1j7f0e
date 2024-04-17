import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loggedMail, setLoggedMail] = useState("");

  return (
    <AuthContext.Provider value={{ loggedMail, setLoggedMail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
