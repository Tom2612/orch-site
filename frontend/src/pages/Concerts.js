import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertDetails from '../components/ConcertDetails';
import '../styles/concerts.css';

export default function Concerts() {
    const navigate = useNavigate();
    const [allConcerts, setAllConcerts] = useState(null);
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState('');

    useEffect(() => {
        const fetchConcerts = async () => {
            const response = await fetch('http://localhost:4000/api/concerts/');
            const json = await response.json();

            if (response.ok) {
                setAllConcerts(json);
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
    };

    const handleFilter = (e) => {
        if (filters === 'instruments') {
            let filteredConcerts = allConcerts.filter(concert => {
                let regex = new RegExp(e.target.value, 'gi')
                return regex.test(concert['instruments']) ? concert : null;

            })
            setConcerts(filteredConcerts);
            // if (e.target.value !== ''){
            //     console.log(e.target.value)
            //     let filteredConcerts = allConcerts.filter(concert => {
            //         let regex = new RegExp(e.target.value, 'gi')
            //         return regex.test(concert['instruments']) ? concert : null;

            //     })
            //     setConcerts(filteredConcerts);
            // } else {
            //     setConcerts(allConcerts);
            // }
            
        } else if (filters === 'payStatus') {
            let filteredConcerts = allConcerts.filter(concert => {
                if (e.target.value === 'true') {
                    return concert['payStatus']
                } else if (e.target.value === 'false') {
                    return !concert['payStatus']
                } else return concert;
            })
            setConcerts(filteredConcerts);
        }
    }

  return (
    <>
        {!loading && 
            <div className='concerts-container'>
                <h2>Concerts</h2>
                    <div className='container filters'>
                        <label>Sort by:</label>
                        <select name='sort' onChange={(e) => {handleSort(e)}}>
                            <option value='close'>Closest</option>
                            <option value='new'>Newest</option>
                        </select>

                        <label>Find by:</label>
                        <select name='find' onChange={(e) => setFilters(e.target.value)}>
                            <option value=''>----</option>
                            <option value='instruments'>Instrument</option>
                            <option value='payStatus'>Paid/Unpaid</option>
                            <option value='region'>Region</option>
                        </select>
                        {filters === 'instruments' && <input onChange={(e)=>handleFilter(e)} type='text'></input>
                            // <select onChange={(e) => handleFilter(e)}>
                            //     <option value=''></option>
                            //     <option value='violin'>violin</option>
                            //     <option value='trumpet'>trumpet</option>
                            //     <option value='cello'>cello</option>
                            // </select>
                        }
                        {filters === 'payStatus' && 
                            <select onChange={(e) => handleFilter(e)}>
                                <option value=''>----</option>
                                <option value='true'>Paid</option>
                                <option value='false'>Unpaid</option>
                            </select>
                        }
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
