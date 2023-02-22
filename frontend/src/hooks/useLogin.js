import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
    }
}