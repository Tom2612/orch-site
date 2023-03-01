import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function GroupUpdateForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [region, setRegion] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedGroup = { name, region, location, phone, description };

        const response = await fetch(`https://localhost:4000/api/groups/${id}`, {
            method: 'POST',
            body: JSON.stringify(updatedGroup),
            headers : {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            navigate('/profile');
        }
        
    }

    return (
        <form className='group-form' onSubmit={handleSubmit}>
        <h1>Update your information here</h1>
        
        <div>
            <label>What is your group's name?</label>
            <input 
            type='text' 
            name='group-name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            //   className={emptyFields.includes('name') ? 'error' : 'input'}
            />
        </div>

        <div>
            <label>Where are you based?</label>
            <select name='region' 
            onChange={(e) => setRegion(e.target.value)}
            value={!region ? '' : region}
            //   className={emptyFields.includes('location') ? 'error' : 'input'}
            >
            <option value={''}>-- Select Region --</option>
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
            {region && 
            <input 
                type='text' 
                name='group-location'
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                // className={emptyFields.includes('location') ? 'error' : 'input'}
                placeholder='City'
            />
            }
            
        </div>

        <div>
            <label>Contact Number (optional)</label>
            <input 
            type='text' 
            name='group-contact-phone'
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className='input'
            />
        </div>

        <div>
            <label>Provide a description of your group</label>
            <textarea 
            name='group-description'
            cols={70}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            />
        </div>

        <button 
            // disabled={loading} 
            className='btn create-btn'>
                Create Group
            </button>
        {/* {error && <p className="error-message">{error}</p>} */}
        </form>
    )
}
