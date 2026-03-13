import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          const res = await api.get("/api/auth/profile");
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
          console.error("Failed to fetch profile", err);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post(`/api/auth/login`, { email, password });
      const userData = res.data;

      setUser({ _id: userData._id, name: userData.name, email: userData.email, role: userData.role });
      setToken(userData.token);
      localStorage.setItem("user", JSON.stringify({ _id: userData._id, name: userData.name, email: userData.email, role: userData.role }));
      localStorage.setItem("token", userData.token);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post(`/api/auth/register`, { name, email, password });
      const userData = res.data;

      setUser({ _id: userData._id, name: userData.name, email: userData.email, role: userData.role });
      setToken(userData.token);
      localStorage.setItem("user", JSON.stringify({ _id: userData._id, name: userData.name, email: userData.email, role: userData.role }));
      localStorage.setItem("token", userData.token);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || "Signup failed";
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);