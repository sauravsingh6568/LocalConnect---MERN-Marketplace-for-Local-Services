import { useEffect, useState } from "react";
import AuthContext from "./auth-context";
import API from "../services/api";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [provider, setProvider] = useState(() => {
    const storedProvider = localStorage.getItem("provider");
    try {
      return storedProvider ? JSON.parse(storedProvider) : null;
    } catch {
      localStorage.removeItem("provider");
      return null;
    }
  });

  const saveAuth = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("provider", JSON.stringify(data.provider));
    setToken(data.token);
    setProvider(data.provider);
  };

  const login = async (mobileNumber, password) => {
    const res = await API.post("/auth/login", { mobileNumber, password });
    saveAuth(res.data);
    return res.data;
  };

  const register = async ({ name, mobileNumber, password, location, profileImage }) => {
    const res = await API.post("/auth/register", {
      name,
      mobileNumber,
      password,
      location,
      profileImage
    });
    saveAuth(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("provider");
    setToken(null);
    setProvider(null);
  };

  useEffect(() => {
    const verifyProvider = async () => {
      if (!token) {
        return;
      }

      try {
        const res = await API.get("/auth/me");
        localStorage.setItem("provider", JSON.stringify(res.data.provider));
        setProvider(res.data.provider);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("provider");
        setToken(null);
        setProvider(null);
      }
    };

    verifyProvider();
  }, [token]);

  const value = {
    token,
    provider,
    isAuthenticated: Boolean(token && provider),
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
