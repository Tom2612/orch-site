import React, { useEffect, useState } from 'react';
import ConcertDetails from '../components/ConcertDetails';

export default function Concerts() {
    const [concerts, setConcerts] = useState(null);

    useEffect(() => {
        const fetchConcerts = async () => {
            const response = await fetch('http://localhost:4000/api/pieces');
            console.log(response);
            const json = await response.json();
            console.log(json);

            if (response.ok) {
                setConcerts(json);
            }
        }

        fetchConcerts();
    }, [])

  return (
    <div className='concerts-container'>
        <h2>Concerts</h2>
        <div className='concerts'>
            {concerts && concerts.map((piece) => (
                <ConcertDetails key={piece._id} concert={piece} />
            ))}
        </div>
    </div>
  )
}
