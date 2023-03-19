import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertDetails from '../components/ConcertDetails';

export default function Concerts() {
    const navigate = useNavigate();
    const [concerts, setConcerts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState(null);

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

    useEffect(() => {
        const handleSorts = () => {
            if (sort === null) {
                return;
            } else if (sort === 'close') {
            const currentDate = new Date();
            const sortedDates = concerts.sort(function(a, b) {
                let dateA = new Date(a.date);
                let dateB = new Date(b.date);

                if (dateA < currentDate || dateB < currentDate) {
                    return -1;
                }

                return dateA - dateB;
            });

            setConcerts(sortedDates);
            }
        }
        
        handleSorts();

    }, [sort])

    const handleSort = (e) => {
        console.log(sort);
        if (e.target.value === 'close') {
            // const currentDate = new Date();
            // const sortedDates = concerts.sort(function(a, b) {
            //     let dateA = new Date(a.date);
            //     let dateB = new Date(b.date);

            //     if (dateA < currentDate || dateB < currentDate) {
            //         return -1;
            //     }
            //     return dateA - dateB;
            // });
            // setConcerts(sortedDates);
            setSort('close');
        }
        
        return;
    }

  return (
    <>
        {!loading && 
            <div className='concerts-container'>
                <h2>Concerts</h2>
                    <div className='container'>
                        <label>Sort by:</label>
                        <select 
                            name='sort'
                            onChange={(e) => {
                                // handleSort(e)
                                setSort(e.target.value);
                            }}
                        >
                            <option value=''>--</option>
                            <option value='new'>Newest</option>
                            <option value='close'>Closest</option>
                        </select>
                        <button onClick={(e) => handleSort(e)}>Apply</button>
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
