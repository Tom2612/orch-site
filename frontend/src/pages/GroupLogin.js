import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

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

          <button disabled={loading}>Log in</button>
          <p>Need an account? <Link to='/new-group'>Sign up here</Link></p>
      </form>
      {error && <p className="error-message">{error}</p>}
    </>
  )
}