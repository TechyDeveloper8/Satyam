import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/categoryService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aether_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('aether_addresses');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'addr-1',
            fullName: 'Alexandre Mercer',
            phone: '+1 (555) 234-5678',
            street: '742 Evergreen Terrace, Suite 400',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94107',
            country: 'United States',
            isDefault: true
          }
        ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('aether_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aether_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('aether_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const login = async (email, password) => {
    const loggedUser = await authService.login({ email, password });
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async (name, email, password, phone) => {
    const newUser = await authService.register({ name, email, password, phone });
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (newAddr) => {
    const addrWithId = { ...newAddr, id: 'addr-' + Date.now() };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(addrWithId));
    } else {
      setAddresses((prev) => [...prev, addrWithId]);
    }
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        addresses,
        addAddress,
        deleteAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
