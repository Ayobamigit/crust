import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext();

const AuthenticationContext = ({ children }) => {
    let authStatus = null
    if (typeof window !== "undefined") {
        authStatus = localStorage.getItem('authentication');
    }
    const[isAuthenticated, setIsAuthenticated] = useState(authStatus ? JSON.parse(authStatus) : false);
    const setAuthenticationStatus = (status) =>{
        setIsAuthenticated(status)
    }

    useEffect(() => {
       localStorage.setItem("authentication", JSON.stringify(isAuthenticated))
    })

    return (
        <authContext.Provider value={{
            isAuthenticated,
            setAuthenticationStatus
        }}>
            { children }
        </authContext.Provider>
    )
}

export default AuthenticationContext;
