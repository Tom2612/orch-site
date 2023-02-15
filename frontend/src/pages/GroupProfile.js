import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConcertDetails from '../components/ConcertDetails';

export default function GroupProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGroupInfo = async () => {
      const response = await fetch(`http://localhost:4000/api/groups/${id}`);
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

  }, [id]);

  return (
    <>
      {!loading && 
      <>
        <div className='profile-info'>
          <h1>Profile</h1>
          <h2>Name: <span>{group.name}</span></h2>
          <h2>Location: <span>{group.location}</span></h2>
          <h2>Contact: <span>{group.contact}</span></h2>
          <button className='update-btn' disabled>Update your information</button>
        </div>

          {!loading && 
            <div className='group-concert-container'>
              <h3 className='group-concert-title'>View and update your concerts:</h3>
              {group.concerts.map((concert) => (
                <>
                  <ConcertDetails key={concert._id} concert={concert} />
                  <button onClick={() => navigate(`/${concert._id}/edit`, {replace: true, state: {...concert} })}>Edit</button>
                </>
              ))}
            </div>
          }

      </>}
      <button className='delete-btn group-del'>Delete group</button>
    </>
  )
}
