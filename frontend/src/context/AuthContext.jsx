import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('career_track_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('career_track_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/api/users/login', { email, password });
    // Handle both { token: "..." } object and string response
    const receivedToken = response.data?.token || (typeof response.data === 'string' ? response.data : null);
    if (!receivedToken) {
      throw new Error('No authentication token received');
    }

    const userData = { email };
    localStorage.setItem('career_track_token', receivedToken);
    localStorage.setItem('career_track_user', JSON.stringify(userData));
    setToken(receivedToken);
    setUser(userData);
    return userData;
  };

  const register = async (username, email, password) => {
    return await api.post('/api/users/register', { username, email, password });
  };

  const logout = () => {
    localStorage.removeItem('career_track_token');
    localStorage.removeItem('career_track_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
