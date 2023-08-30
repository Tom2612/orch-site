import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className='error-page'>
        <h1><span className='material-symbols-outlined'>error</span>Sorry, looks like we can't find that one!</h1>
        <p>Click <Link to='/'>here</Link> to return home.</p>
    </div>
  )
}
