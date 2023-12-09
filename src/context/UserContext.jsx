import React, { createContext, useState } from 'react';

const UserContext = createContext();
const UserProvider = ({ children }) => {
    const login = (auth) => {
        localStorage.setItem("userAuth", JSON.stringify({
            token: auth.token,
            id: auth.id,
            isAdmin: auth.isAdmin,
            auth: true,
        }));
    };

    const logout = () => {
        localStorage.removeItem("userAuth");
    };
    return (
        <UserContext.Provider value={{login, logout}}>
            {children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };