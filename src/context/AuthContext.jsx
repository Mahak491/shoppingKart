import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) {
      alert('Invalid email or password. Please sign up first.');
      return false;
    }

    setUser(existingUser);
    localStorage.setItem('authUser', JSON.stringify(existingUser));
    return true;
  };

  const signup = (email, password) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      alert('User already exists. Please login.');
      return false;
    }

    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem('registeredUsers', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('authUser', JSON.stringify(newUser));
    return true;
  };

  const guestLogin = () => {
    const guestUser = { email: 'guest@guest.com' };
    setUser(guestUser);
    localStorage.setItem('authUser', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
