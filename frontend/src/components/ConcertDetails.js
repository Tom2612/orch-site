import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConcertDetails({ concert }) {
  const navigate = useNavigate();

  return (
    <div className='concert-details' onClick={() => {navigate(`/concerts/${concert._id}`)}}>
        <h4 className='orchestra'>{concert.group.name}</h4>
        <p className='location'>{concert.location}</p>
        <p className='date'>{concert.date.split('-').reverse().join('/')}</p>
        {concert.payStatus ? 
          <div className='status paid'>paid</div> : 
          <div className='status unpaid'>unpaid</div>
        }
        <ul className='composers'>
          {/* {concert.pieces.map((piece, index) => (
            <li key={index}>{piece.composer}</li>
          ))} */}
        </ul>
        <ul className='instruments'>
            {concert.instruments.map((instrument, index) => (
                <li key={index}>{instrument}</li>
            ))}
        </ul>
    </div>
  )
}
