import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/concertPage.css';

export default function ConcertPage() {
    const [concert, setConcert] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchConcert = async () => {
            const response = await fetch(`http://localhost:4000/api/concerts/view/${id}`);
            const json = await response.json();

            if (response.ok) {
                setConcert(json);
                setLoading(false);
            }
        }

        fetchConcert();
    }, [id])

  return (
    <div className='container'>
        {!loading && 
            <>
                <h2>{concert.group.name}</h2>
                <h3>Date: {concert.date}</h3>
                <h3>Location: {concert.group.region}, {concert.group.location}, {concert.location}</h3>
                <div><span>contact details:</span>
                    {' ' + concert.group.phone + ' ' + concert.group.email} 
                </div>
                <p>We are {concert.payStatus ? 'able' : 'not able'} to offer financial support.</p>
                <div>
                    <h4>Playing:</h4>
                    <ul>
                        {concert.pieces.map((piece, index) => {
                            return <li key={index}>{piece.composer}: {piece.title}</li>
                        })}
                    </ul>
                </div>
                
                <div>
                    <h4>Requirements:</h4>
                    <ul>
                        {concert.instruments.map((instrument, index) => {
                            return <li>{instrument}</li>
                        })}
                    </ul>
                </div>
                
            </>
        }
    </div>
  )
}
