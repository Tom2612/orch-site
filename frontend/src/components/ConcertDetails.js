import React from 'react';

export default function ConcertDetails({ concert }) {
  return (
    <div className='concert-details'>
        <h4 className='orchestra'>{concert.orchestra}</h4>
        <p className='location'>{concert.location}</p>
        <p className='date'>{concert.date}</p>
        {concert.payStatus ? 'paid' : 'unpaid'}
        <ul className='composers'>
          {concert.pieces.map((piece, index) => (
            <li key={index}>{piece.composer}</li>
          ))}
        </ul>
        <ul className='pieces'>
            {concert.instruments.map((instrument, index) => (
                <li key={index}>{instrument}</li>
            ))}
        </ul>
    </div>
  )
}
