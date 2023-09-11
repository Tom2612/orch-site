import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ConcertForm from './ConcertForm';
import runValidation from './formValidator';

export default function EditConcert () {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [concert, setConcert] = useState({
        date: '',
        region: '',
        location: '',
        payStatus: null,
        pieces: [],
        instruments: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);

    useEffect(() => {
        const fetchConcert = async () => {
        const response = await fetch(`http://localhost:4000/api/concerts/edit/${id}`, {
            headers: {
            "Authorization": `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            navigate('/unauthorised');
        }

        if (response.ok) {
            setConcert({
                ...json,
                date: json.date.split('T')[0]
            });
            setLoading(false);
        }
        }

        fetchConcert();

    }, [id, navigate, user])


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

        const response = await fetch(`http://localhost:4000/api/concerts/${id}`, {
            method: 'PATCH',
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
            navigate('/groups/profile');
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:4000/api/concerts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json();

            if (!response.ok) {
                setLoading(false);
                setError(json.error);
            }

            navigate('/groups/profile');
        } catch(e) {
            setError(e.message);
        }
    }

    return (
        <div>
            Edit Concert
            <ConcertForm 
                handleSubmit={handleSubmit} 
                handleDelete={handleDelete}
                concert={concert} 
                setConcert={setConcert} 
                loading={loading}
                editing={true}
            />

            <div>
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}