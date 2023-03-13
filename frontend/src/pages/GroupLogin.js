import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import '../styles/login.css';

export default function GroupLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

  }

  return (
    <>
      <form className='login' onSubmit={handleSubmit}>
          <h1>Log in</h1>

          <label>Email:</label>
          <input 
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-cy='email'
          />

          <label>Password:</label>
          <input 
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-cy='password'
          />

          <button disabled={loading} className='btn update-btn'>Log in</button>
          <p>Need an account? <Link to='/new-group'>Sign up here</Link></p>
      </form>
      {error && <p className="error-message">{error}</p>}
    </>
  )
}
