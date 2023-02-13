import React, { useState } from 'react'

export default function GroupForm() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const group = { name, location, contact };

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
        setError(null);
        setName('');
        setLocation('');
        setContact('');
      }
    }

  return (
    <form className='group-form' onSubmit={handleSubmit}>
      <label>Name</label>
      <input 
        type='text' 
        name='group-name'
        onChange={(e) => {
          setName(e.target.value)
          return setEmptyFields(emptyFields.filter(field => field !== 'name'))
        }}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
    />

      <label>location</label>
      <input 
        type='text' 
        name='group-location'
        onChange={(e) => {
          setLocation(e.target.value)
           return setEmptyFields(emptyFields.filter(field => field !== 'location'))
        }}
        value={location}
        className={emptyFields.includes('location') ? 'error' : ''}
    />

      <label>Contact</label>
      <input 
        type='text' 
        name='group-contact'
        onChange={(e) => {
          setContact(e.target.value)
           return setEmptyFields(emptyFields.filter(field => field !== 'contact'))
        }}
        value={contact}
        className={emptyFields.includes('contact') ? 'error' : ''}
    />

      <button>Create Group</button>
      {error && <p>{error}</p>}
    </form>
  )
}
