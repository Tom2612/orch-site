import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function ConcertPage() {
    const [concert, setConcert] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchConcert = async () => {
            const response = await fetch(`http://localhost:4000/api/concerts/${id}`);
            const json = await response.json();

            if (response.ok) {
                setConcert(json);
                setLoading(false);
            }
        }

        fetchConcert();
    }, [id])

  return (
    <div className='concert-page'>
        {!loading && 
            <h2>{concert.orchestra.location}</h2>
        }
    </div>
  )
}
