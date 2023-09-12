import React, { useEffect, useState } from 'react';
import ConcertCard from './ConcertCard';
import ConcertsController from './ConcertsController';
import './styles/allConcerts.css';

export default function Concerts() {
    const [allConcerts, setAllConcerts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConcerts = async () => {
            const response = await fetch('http://localhost:4000/api/concerts/');
            const json = await response.json();

            if (response.ok) {
                setAllConcerts(json);
                setLoading(false);
            }
        }

        fetchConcerts();
    }, []);

    const handleSubmitFilters = async (e, queries) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:4000/api/concerts/', {
            method: 'POST',
            body: JSON.stringify(queries),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        setAllConcerts(json);
    }

    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            <h2>Browse Concerts</h2>

            {

            <ConcertsController handleSubmitFilters={handleSubmitFilters}/>
            }
            <div className='concerts-container'>
                {
                    allConcerts && allConcerts.map(concert => (
                        <ConcertCard key={concert._id} concert={concert} />
                    ))
                }
            </div> 

            {allConcerts.length === 0 && <h1>Sorry, we have no new concerts to show!</h1>}
        </div>
    )
}
