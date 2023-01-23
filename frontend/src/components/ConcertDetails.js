import React from 'react';

export default function ConcertDetails({ concert }) {
  return (
    <div className='concert-details'>
        <h4>{concert.composer}</h4>
        <p>{concert.title}</p>
        <ul>
            {concert.instruments.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
  )
}
