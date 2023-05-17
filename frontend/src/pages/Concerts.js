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

            console.log(new Date(json[1].date) < new Date());

            console.log(json.filter(concert => {
                return (new Date(concert.date) > new Date());
            }))

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
        setConcerts(allConcerts);
        if (filters === 'instruments') {
            let filteredConcerts = allConcerts.filter(concert => {
                let regex = new RegExp(e.target.value, 'gi')
                return regex.test(concert['instruments']) ? concert : null;
            })
            setConcerts(filteredConcerts);            
        } else if (filters === 'payStatus') {
            let filteredConcerts = allConcerts.filter(concert => {
                if (e.target.value === 'true') {
                    return concert['payStatus'];
                } else if (e.target.value === 'false') {
                    return !concert['payStatus'];
                } else return concert;
            })
            setConcerts(filteredConcerts);
        } else if (filters === 'region') {
            if (e.target.value !== '') {
                let filteredConcerts = allConcerts.filter(concert => concert.group.region === e.target.value);
                setConcerts(filteredConcerts);
            }
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
                        {filters === 'instruments' && <input onChange={(e)=>handleFilter(e)} type='text' placeholder='Begin typing'></input>}
                        {filters === 'payStatus' && 
                            <select onChange={(e) => handleFilter(e)}>
                                <option value=''>----</option>
                                <option value='true'>Paid</option>
                                <option value='false'>Unpaid</option>
                            </select>
                        }
                        {filters === 'region' && 
                            <select onChange={(e) => handleFilter(e)}>
                                <option value={''}>----</option>
                                <option value={'East Midlands'}>East Midlands</option>
                                <option value={'East of England'}>East of England</option>
                                <option value={'London'}>London</option>
                                <option value={'North East'}>North East</option>
                                <option value={'North West'}>North West</option>
                                <option value={'Northern Ireland'}>Northern Ireland</option>
                                <option value={'Scotland'}>Scotland</option>
                                <option value={'South East'}>South East</option>
                                <option value={'South West'}>South West</option>
                                <option value={'Wales'}>Wales</option>
                                <option value={'West Midlands'}>West Midlands</option>
                                <option value={'Yorkshire and The Humber'}>Yorkshire and The Humber</option>
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
