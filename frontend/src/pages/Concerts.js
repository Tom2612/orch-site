import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertDetails from '../components/ConcertDetails';

export default function Concerts() {
    const navigate = useNavigate();
    const [concerts, setConcerts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConcerts = async () => {
            const response = await fetch('http://localhost:4000/api/concerts/');
            const json = await response.json();

            if (response.ok) {
                setConcerts(json);
                setLoading(false);
            }
        }

        fetchConcerts();
    }, []);

    const handleSort = (e) => {
        if (e.target.value === 'close') {
            let sortedConcerts = [].concat(concerts)
                .sort((a, b) => a.date > b.date ? 1 : -1);
            setConcerts(sortedConcerts);
        } else if (e.target.value === 'new') {
            let sortedConcerts = [].concat(concerts)
                .sort((a, b) => new Date(a.createdAt.split('T')[0]) - new Date(b.createdAt.split('T')[0]));
            setConcerts(sortedConcerts.reverse());
        }
    }

  return (
    <>
        {!loading && 
            <div className='concerts-container'>
                <h2>Concerts</h2>
                    <div className='container'>
                        <label>Sort by:</label>
                        <select name='sort' onChange={(e) => {handleSort(e)}}>
                            <option value='close'>Closest</option>
                            <option value='new'>Newest</option>
                        </select>
                    </div>

                    {concerts && concerts.map((concert) => (
                        <div key={concert._id} className='concerts' onClick={() => {navigate(`/concerts/${concert._id}`)}}>
                            <ConcertDetails key={concert._id} concert={concert} />
                        </div>
                    ))}
                {concerts.length === 0 && <h1>Sorry, we have no new concerts to show!</h1>}
            </div>
        }
    </>
  )
}
