import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertDetails from '../components/ConcertDetails';
import { useAuth } from '../contexts/AuthContext';

export default function GroupProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGroupInfo = async () => {
      const response = await fetch(`http://localhost:4000/api/groups/profile`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (!response.ok) {
        console.log('error getting group');
        console.log(json.error);
      }

      if (response.ok) {
        setGroup(json);
        setLoading(false);
      }
    }

    getGroupInfo();

  }, [user.token]);

  return (
    <>
      {!loading && 
      <>
        <div className='profile-info'>
          <h1>Profile</h1>
          <h2>Name: <span>{group.name}</span></h2>
          <h2>Location: <span>{group.location}</span></h2>
          <h2>Email: <span>{group.contact}</span></h2>
          {group.phone && <h2>Phone: <span>{group.phone}</span></h2>}
          <button className='update-btn' disabled>Update your information</button>
        </div>

        {!loading && 
          <div className='group-concert-container'>
            <h3 className='group-concert-title'>View and update your concerts:</h3>
            <button 
              className='create-btn'
              onClick={() => navigate('/new-concert')}
            >Add a concert</button>
            {group.concerts && group.concerts.map((concert) => (
              <>
                <ConcertDetails key={concert._id} concert={concert} />
                <span onClick={() => navigate(`/${concert._id}/edit`, {replace: true, state: {...concert} })}>Edit</span>
              </>
            ))}
          </div>
        }

      </>}
      <button className='delete-btn group-del'>Delete group</button>
    </>
  )
}
