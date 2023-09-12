import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function ConcertDetails ()  {
    const [concert, setConcert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchConcert = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/concerts/view/${id}`);
                const json = await response.json();

                if (!response.ok) {
                    setLoading(false);
                    throw new Error(json.error);
                }
                if (response.ok) {
                    setConcert(json);
                    setLoading(false);
                }
            } catch(e) {
                setError(e.message);
            }
            
        }

        fetchConcert();
    }, [id])

    if (loading) return <p>loading</p>

    if (error) return <p>{error}</p>

    return (
        <div>
            Concert Details
            <h2>{concert.group.name}</h2>
            <h3>{concert.location}, {concert.region}</h3>
            <p>Date: {format(new Date(concert.date), 'PP')}</p>
            <div>
                Contact details:
                <p>{concert.group.email}</p>
                <p>{concert.group.phone}</p>
            </div>
            <p>We {concert.payStatus? 'can' : 'can\'t'} offer financial support.</p>

            <h3>Playing:</h3>
            <ul>
                {concert.pieces.map((piece, index) => {
                    return <li key={index}>{piece.composer}: {piece.title}</li>
                })}
            </ul>

            <h3>Looking for:</h3>
            <ul>
                {concert.instruments.map((instrument, index) => {
                    return <li key={index}>{instrument}</li>
                })}
            </ul>
        </div>
    )
}