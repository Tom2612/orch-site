import React from 'react';
import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';

export default function ConcertCard({ concert }) {
    const navigate = useNavigate(); 
    return (
        <div onClick={() => {navigate(`/concerts/${concert._id}`)}}>
            <h2>{concert.group.name} - {concert.group.region}</h2>
            <span>{concert.payStatus ? 'Paid' : 'Unpaid'}</span>
            <p>{format(new Date(concert.date), 'PP')}</p>
            <ul>
                Looking for: 
                {concert.instruments.map((instrument, i) => {
                    return <li key={instrument+i}>{instrument}</li>
                })}
            </ul>
            <p>Posted: {formatDistanceToNow(new Date(concert.createdAt), {addSuffix: true})}</p>
        </div>
    )
}
