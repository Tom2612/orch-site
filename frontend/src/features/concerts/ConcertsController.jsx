import React from 'react'

export default function ConcertsController() {
  return (
    <div className='container filters'>
                        <label>Sort by:</label>
                        <select name='sort' onChange={(e) => {handleSort(e)}}>
                            <option value='close'>Closest</option>
                            <option value='new'>Newest</option>
                        </select>

                        <label>Find by:</label>
                        <select name='find' onChange={(e) => {
                            if(e.target.value === '') {
                                handleFilter(e);
                                setFilters(e.target.value);
                            } else {
                                setFilters(e.target.value);
                            }}}>
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
  )
}
