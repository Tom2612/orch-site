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
            <>
                <h2>Name: {concert.group.name}</h2>
                <h2>Location: {concert.group.location}</h2>
                <h3>Date: {concert.date}</h3>
                <p>Contact {concert.group.name}: {concert.group.contact}</p>
                <p>This is {concert.payStatus ? 'a paid' : 'an unpaid'} concert</p>
                <ul>
                    {concert.pieces.map(piece => {
                        return <li>{piece.composer}: {piece.title}</li>
                    })}
                </ul>
                <p>Instruments required:</p>
                <ul>
                    {concert.instruments.map(instrument => {
                        return <li>{instrument}</li>
                    })}
                </ul>
            </>
        }
    </div>
  )
}
