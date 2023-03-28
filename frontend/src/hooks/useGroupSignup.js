import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useGroupSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { dispatch } = useAuth();

    const groupSignup = async (email, password, name, region, location, phone, description) => {
        setLoading(true);
        setError(null);
        setEmptyFields([]);
    
        const response = await fetch('http://localhost:4000/api/groups/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, region, location, phone, description }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setLoading(false);
        }
    }
    return { groupSignup, loading, error, emptyFields };
}