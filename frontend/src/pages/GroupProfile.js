import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertDetails from '../components/ConcertDetails';

export default function GroupProfile() {
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGroupInfo = async () => {
      const response = await fetch('http://localhost:4000/api/groups/63e088c703b4f87a27244077');
      const json = await response.json();

      if (!response.ok) {
        console.log('error getting group');
      }

      if (response.ok) {
        setGroup(json);
        setLoading(false);
      }
    }

    getGroupInfo();

  }, []);

  return (
    <>
      {!loading && 
        <div className='profile-info'>
          <h1>Profile</h1>
          <h2>Name: {group.name}</h2>
          <h2>Location: {group.location}</h2>
          <h2>Contact information: {group.contact}</h2>
          {!loading && 
            <div className='concert-container'>
              <h3>Your concerts:</h3>
              {group.concerts.map((concert) => (
                <>
                  <ConcertDetails key={concert._id} concert={concert} />
                  <button onClick={() => navigate(`/${concert._id}/edit`, {replace: true})}>Update / Remove</button>
                </>
              ))}
            </div>
          }
        </div>
      }
      <button>Delete group</button>
    </>
  )
}
