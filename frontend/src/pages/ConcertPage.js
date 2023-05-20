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
            <div className='card-layout'>
                <div>
                    <h2>{concert.group.name}</h2>
                    <h3>Date: {concert.date.split('T')[0]}</h3>
                    
                </div>
                
                <div>
                    <h3>Location: {concert.location}, {concert.group.location}, {concert.group.region}</h3>
                    <div>Please contact:
                    {concert.group.phone && <span className='contact'>Phone number: {concert.group.phone}</span>}
                    {concert.group.email && <span className='contact'>Email: {concert.group.email}</span>}
                    
                    </div>
                    <p>We are {concert.payStatus ? 'able' : 'not able'} to offer financial support.</p>
                </div>

                <div className='playing'>
                    <h4>Playing:</h4>
                    <ul>
                        {concert.pieces.map((piece, index) => {
                            return <li key={index}>{piece.composer}: {piece.title}</li>
                        })}
                    </ul>
                </div>
                
                <div className='required'>
                    <h4>Looking for:</h4>
                    <ul>
                        {concert.instruments.map((instrument, index) => {
                            return <li key={index}>{instrument}</li>
                        })}
                    </ul>
                </div>
            </div>
        }
    </div>
  )
}
