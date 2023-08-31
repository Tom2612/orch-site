import React, { useEffect, useState } from 'react';
import ConcertCard from './ConcertCard';
import ConcertsController from './ConcertsController';
import '../../styles/concerts.css';

export default function Concerts() {
    const [allConcerts, setAllConcerts] = useState(null);

    const [loading, setLoading] = useState(true);
    // const [filters, setFilters] = useState('');

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

    // Want to filter by: Location, Paid, Instruments, Pieces

    // const handleSort = (e) => {
    //     if (e.target.value === 'close') {
    //         let sortedConcerts = [].concat(concerts)
    //             .sort((a, b) => a.date > b.date ? 1 : -1);
    //         setConcerts(sortedConcerts);
    //     } else if (e.target.value === 'new') {
    //         let sortedConcerts = [].concat(concerts)
    //             .sort((a, b) => new Date(a.createdAt.split('T')[0]) - new Date(b.createdAt.split('T')[0]));
    //         setConcerts(sortedConcerts.reverse());
    //     }
    // };

    // const handleFilter = (e) => {
    //     setConcerts(allConcerts);
    //     if (filters === 'instruments') {
    //         let filteredConcerts = allConcerts.filter(concert => {
    //             let regex = new RegExp(e.target.value, 'gi')
    //             return regex.test(concert['instruments']) ? concert : null;
    //         })
    //         setConcerts(filteredConcerts);            
    //     } else if (filters === 'payStatus') {
    //         let filteredConcerts = allConcerts.filter(concert => {
    //             if (e.target.value === 'true') {
    //                 return concert['payStatus'];
    //             } else if (e.target.value === 'false') {
    //                 return !concert['payStatus'];
    //             } else return concert;
    //         })
    //         setConcerts(filteredConcerts);
    //     } else if (filters === 'region') {
    //         if (e.target.value !== '') {
    //             let filteredConcerts = allConcerts.filter(concert => concert.group.region === e.target.value);
    //             setConcerts(filteredConcerts);
    //         }
    //     }
    // }

  return (
    <>
        {!loading && 
            <div className='concerts-container'>
                <h2>Browse Concerts</h2>

                {
                // Space here for the controller component 
                <ConcertsController />
                }
                <div>
                    {
                        // Grid layout for cards
                        allConcerts && allConcerts.map(concert => (
                            <ConcertCard key={concert._id} concert={concert} />
                        ))
                    }
                </div> 

                    {/* {allConcerts && allConcerts.map((concert) => (
                        <div key={concert._id} className='concerts' onClick={() => {navigate(`/concerts/${concert._id}`)}}>
                            <ConcertDetails key={concert._id} concert={concert} />
                        </div>
                    ))} */}
                {allConcerts.length === 0 && <h1>Sorry, we have no new concerts to show!</h1>}
            </div>
        }
    </>
  )
}
