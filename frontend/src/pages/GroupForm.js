import React, { useState } from 'react'

export default function GroupForm() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [error, setError] = useState('');

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
        setError(json.error)
      }

      if (response.ok) {
        setName('');
        setLocation('');
        setContact('');
      }
      console.log(json);
    }

  return (
    <form className='group-form' onSubmit={handleSubmit}>
      <label>Name</label>
      <input 
        type='text' 
        name='group-name'
        onChange={(e) => setName(e.target.value)}
        value={name}
    />

      <label>location</label>
      <input 
        type='text' 
        name='group-location'
        onChange={(e) => setLocation(e.target.value)}
        value={location}
    />

      <label>Contact</label>
      <input 
        type='text' 
        name='group-contact'
        onChange={(e) => setContact(e.target.value)}
        value={contact}
    />

      <button>Create Group</button>
      {error && <p>{error}</p>}
    </form>
  )
}
