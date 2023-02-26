import { createContext, useReducer, useEffect, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({type: 'LOGIN', payload: user});
        }
        setLoading(false);
    }, [])

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { !loading && children }
        </AuthContext.Provider>
    )
}