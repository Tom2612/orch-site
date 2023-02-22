import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
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
    if(!password) {
      setEmptyFields(emptyFields.concat('password'));
    }
    if (emptyFields.length > 1) {
      return setError('Please fill in the required fields');
    }

    const group = { email, password, name, location, phone, description };
    
    const response = await fetch('http://localhost:4000/api/groups/signup', {
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
      setPassword('');
      setPhone('');
      navigate(`/groups/${json._id}`);
    }
  }

  return (
    <form className='group-form' onSubmit={handleSubmit}>
      <div className='group-form-email-password'>
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
      
        <label>Create Password</label>
        <input 
          type='password' 
          name='group-contact-password'
          onChange={(e) => {
            setPassword(e.target.value)
            return setEmptyFields(emptyFields.filter(field => field !== 'password'))
          }}
          value={password}
          className={emptyFields.includes('password') ? 'error' : 'input'}
          required
        />
      </div>

      <div>
        <label>What is your group's name?</label>
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
        <label>Where are you based?</label>
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

      <div>
        <label>Provide a description of your group</label>
        <textarea 
          name='group-description'
          cols={70}
          rows={5}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          value={description}
        />
      </div>

      <button className='create-btn'>Create Group</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}
