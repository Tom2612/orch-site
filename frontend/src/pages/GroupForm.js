import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupForm() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name) {
      setEmptyFields(emptyFields.concat('name'));
    }
    if(!location) {
      setEmptyFields(emptyFields.concat('location'));
    }
    if(!email) {
      setEmptyFields(emptyFields.concat('email'));
    }
    if (emptyFields.length > 1) {
      return setError('Please fill in the required fields');
    }

    const group = { name, location, email, phone };
    
    const response = await fetch('http://localhost:4000/api/groups', {
      method: 'POST',
      body: JSON.stringify(group),
      headers: {
          'Content-Type': 'application/json'
      }
    })

    const json = await response.json();
    
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setName('');
      setLocation('');
      setEmail('');
      setPhone('');
      navigate(`/groups/${json._id}`);
    }
  }

  return (
    <form className='group-form' onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input 
          type='text' 
          name='group-name'
          onChange={(e) => {
            setName(e.target.value)
            return setEmptyFields(emptyFields.filter(field => field !== 'name'))
          }}
          value={name}
          className={emptyFields.includes('name') ? 'error' : 'input'}
          required
        />
      </div>

      <div>
        <label>location</label>
        <input 
          type='text' 
          name='group-location'
          onChange={(e) => {
            setLocation(e.target.value)
            return setEmptyFields(emptyFields.filter(field => field !== 'location'))
          }}
          value={location}
          className={emptyFields.includes('location') ? 'error' : 'input'}
          required
        />
      </div>

      <div>
        <label>Contact Email</label>
        <input 
          type='email' 
          name='group-contact-email'
          onChange={(e) => {
            setEmail(e.target.value)
            return setEmptyFields(emptyFields.filter(field => field !== 'email'))
          }}
          value={email}
          className={emptyFields.includes('email') ? 'error' : 'input'}
          required
        />
      </div>

      <div>
        <label>Contact Number (optional)</label>
        <input 
          type='text' 
          name='group-contact-phone'
          onChange={(e) => {
            setPhone(e.target.value)
          }}
          value={phone}
          className='input'
        />
      </div>

      <button className='create-btn'>Create Group</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}
