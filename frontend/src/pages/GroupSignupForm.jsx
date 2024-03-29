import React, { useState } from 'react';
import '../styles/groupSignupForm.css';
import { useAuth } from '../contexts/AuthContext';

export default function GroupForm() {

  const { dispatch } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSignUpGroup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setEmptyFields([]);

    const response = await fetch('http://localhost:4000/api/groups/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, region, location, phone, description }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await response.json();

    if (!response.ok) {
        setLoading(false);
        setError(json.error);
        setEmptyFields(json.emptyFields ? json.emptyFields : []);
    }

    if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({type: 'LOGIN', payload: json});
        setLoading(false);
    }
  }

  return (
    <form className='group-form' onSubmit={handleSignUpGroup}>
      <h1>Sign up your group here</h1>
      <div className='group-form-email-password'>
        <label>Email</label>
        <input 
          type='email' 
          name='group-contact-email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={emptyFields.includes('email') ? 'error' : 'input'}
        />
      
        <label>Password</label>
        <input 
          type='password' 
          name='group-contact-password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={emptyFields.includes('password') ? 'error' : 'input'}
        />
      </div>

      <div>
        <label>What is your group's name?</label>
        <input 
          type='text' 
          name='group-name'
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={emptyFields.includes('name') ? 'error' : 'input'}
          data-cy='group-name'
        />
      </div>

      <div>
        <label>Where are you based?</label>
        <select name='region' 
          onChange={(e) => setRegion(e.target.value)}
          value={!region ? '' : region}
          className={emptyFields.includes('location') ? 'error' : 'input'}
          data-cy='group-region'
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
            className={emptyFields.includes('location') ? 'error' : 'input'}
            placeholder='City'
            data-cy='group-city'
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
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <button disabled={loading} className='btn create-btn'>Create Group</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}
