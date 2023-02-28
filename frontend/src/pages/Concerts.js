import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertDetails from '../components/ConcertDetails';

export default function Concerts() {
    const navigate = useNavigate();
    const [concerts, setConcerts] = useState(null);

    useEffect(() => {
        const fetchConcerts = async () => {
            const response = await fetch('http://localhost:4000/api/concerts');
            const json = await response.json();

            if (response.ok) {
                setConcerts(json);
            }
        }

        fetchConcerts();
    }, [])

  return (
    <div className='concerts-container'>
        <h2>Concerts</h2>
        
            {concerts && concerts.map((concert) => (
                <div className='concerts' onClick={() => {navigate(`/concerts/${concert._id}`)}}>
                    <ConcertDetails key={concert._id} concert={concert} />
                </div>
            ))}
    </div>
  )
}
