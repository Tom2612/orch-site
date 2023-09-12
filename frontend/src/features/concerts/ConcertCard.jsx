import React from 'react';
import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';
import './styles/concertCard.css';

export default function ConcertCard({ concert }) {
    const navigate = useNavigate(); 
    return (
        <div className='concert-card' onClick={() => {navigate(`/concerts/${concert._id}`)}}>
            <div className='card-header'>
                <span id='highlight'>{concert.region}</span>
                <p id='highlight'>{format(new Date(concert.date), 'PP')}</p>
            </div>
            
            <h2>{concert.group.name}</h2>
            <span className={concert.payStatus ? 'banner paid' : 'banner unpaid'}>{concert.payStatus ? 'Paid' : 'Unpaid'}</span>
            <ul id='small-text'>
                Looking for: 
                {concert.instruments.map((instrument, i) => {
                    return <li key={instrument+i}>{instrument}</li>
                })}
            </ul>
            <p>Posted: {formatDistanceToNow(new Date(concert.createdAt), {addSuffix: true})}</p>
        </div>
    )
}
