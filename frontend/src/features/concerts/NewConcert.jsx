import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ConcertForm from './ConcertForm';
import runValidation from './formValidator';

export default function NewConcert () {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [concert, setConcert] = useState({
        date: '',
        region: '',
        location: '',
        payStatus: false,
        pieces: [],
        instruments: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const missingFields = runValidation(concert);
        if (missingFields.length > 0) {
            setError('Please fill in all required fields');
            setLoading(false);
            return setEmptyFields(emptyFields);
        }
        
        if (!user) {
            return setError('You must be logged in to do that.');
        }

        const response = await fetch('http://localhost:4000/api/concerts/new', {
            method: 'POST',
            body: JSON.stringify(concert),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            navigate('/concerts');
        }
    }

    return (
        <div>
            New Concert
            <ConcertForm 
                handleSubmit={handleSubmit} 
                concert={concert} 
                setConcert={setConcert} 
                loading={loading}
                editing={false}
            />

            <div>
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}