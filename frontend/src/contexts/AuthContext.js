import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={null}>
            { children }
        </AuthContext.Provider>
    )
}