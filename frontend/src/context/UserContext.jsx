import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // For prop type checking

// Initialize userContext with default values
export const userContext = createContext({
  user: null,
  updateUser: () => {},
  clearUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Default User" }); // Set a default user for testing

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <userContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

// Add prop type validation
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
