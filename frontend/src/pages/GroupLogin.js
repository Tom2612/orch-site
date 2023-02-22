import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function GroupLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

  }

  return (
    <form class='login' onSubmit={handleSubmit}>
        <h2>Log in</h2>

        <label>Email:</label>
        <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input 
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Log in</button>
        <p>Need an account? <Link to='/new-group'>Sign up here</Link></p>
    </form>
  )
}
