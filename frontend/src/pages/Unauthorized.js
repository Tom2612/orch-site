import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

export default function Unauthorized() {
    const { logout } = useLogout();
  
    return (
    <div className='error-page'>
        <h1><span className='material-symbols-outlined'>error</span>Sorry, looks like you are not authorised to do that!</h1>
        <p>Try <Link onClick={logout} to='/login-group'>logging in</Link> again</p>
        <p>Or click <Link to='/'>here</Link> to return home.</p>
    </div>
  )
}