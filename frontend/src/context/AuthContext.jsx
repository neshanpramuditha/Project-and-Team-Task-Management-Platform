import { createContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUser = async () => {

      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {

        const data = await authService.getCurrentUser();

        setUser(data.user);

      } catch {

        localStorage.removeItem("token");

      }

      setLoading(false);

    };

    loadUser();

  }, []);

  const login = async (email, password) => {

    const data = await authService.loginUser(
      email,
      password
    );

    localStorage.setItem(
      "token",
      data.token
    );

    setUser(data.user);

  };

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>

  );

}