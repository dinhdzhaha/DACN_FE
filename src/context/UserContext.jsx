import React, { createContext, useState } from 'react';
import axios from "axios";

const UserContext = createContext();
const UserProvider = ({ children }) => {
    const login = (token,id) => {
        localStorage.setItem("userAuth", JSON.stringify({
            token: token,
            id: id,
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