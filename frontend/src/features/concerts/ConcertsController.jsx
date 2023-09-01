import React, { useState } from 'react';

export default function ConcertsController({ handleSubmitFilters }) {
    const [queries, setQueries] = useState({
        location: '',
        payStatus: '',
        instrument: '',
        composer: ''
    });

    const handleChange = (e) => {
        setQueries({
            ...queries,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form className='container filters'>

            <label htmlFor='instrument'>Find by looking for:</label>
            <input 
                type='text'
                id='instrument'
                name='instrument' 
                onChange={handleChange} 
                value={queries.instrument} 
                placeholder='Type instrument' 
            />

            <label htmlFor='composer'>Find by composer:</label>
            <input 
                type='text'
                id='composer'
                name='composer' 
                onChange={handleChange} 
                value={queries.composer} 
                placeholder='Type composer name' 
            />            
            
            <label htmlFor='payStatus'>Find by paid/unpaid:</label>
            <select name='payStatus' id='payStatus' onChange={handleChange}>
                <option value=''>----</option>
                <option value='true'>Paid</option>
                <option value='false'>Unpaid</option>
            </select>
            
            <label htmlFor='location'>Find by location:</label>
            <select name='location' id='location' value={queries.location} onChange={handleChange}>
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
            
            <button type='submit' onClick={(e) => handleSubmitFilters(e, queries)}>Apply</button>
        </form>
    )
}
