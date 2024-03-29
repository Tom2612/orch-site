import React from 'react';
import '../styles/concertDetails.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format } from 'date-fns';

export default function GroupConcertDetails({ group, concert }) {

  return (
    <div className='concert-details'>
        <h4 className='orchestra'>{group.name}</h4>
        <p className='location'>{concert.location}, {group.region}, {group.location}</p>
        <p className='date'>{format(new Date(concert.date), 'PP')}</p>
        {concert.payStatus ? 
          <div className='status paid'>paid</div> : 
          <div className='status unpaid'>unpaid</div>
        }
        <ul className='composers'>
          {concert.pieces.map((piece, index) => (
            <li key={index}>{piece.composer}</li>
          ))}
        </ul>
        <ul className='instruments'>
            {concert.instruments.map((instrument, index) => (
                <li key={index}>{instrument}</li>
            ))}
        </ul>
        <p className='posted'>Posted: {formatDistanceToNow(new Date(concert.createdAt), {addSuffix: true})}</p>
    </div>
  )
}
