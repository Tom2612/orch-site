import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConcertDetails from '../components/ConcertDetails';
import { useAuth } from '../contexts/AuthContext';
import '../styles/profile.css';

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
        navigate(-1);
      }

      if (response.ok) {
        setGroup(json);
        setLoading(false);
      }
    }

    getGroupInfo();

  }, [navigate, user.token]);

  const handleDelete = async () => {
    alert('Not quite working yet!');
  }

  return (
    <>
      {!loading && 
      <>
        <div className='container profile-info'>
          <div className='container-left'>
            <h1>Profile</h1>
            <span className='profile-name'>{group.name}</span>
            <span>{group.location + ' (' + group.region + ')'}</span>
            <span>Email: {group.email}</span>
            {group.phone && <h2>Phone: {group.phone}</h2>}
          </div>
          <div className='container-right'>
            {group.description && <>
                <h2>Description</h2>
                <p>{group.description}</p>
              </>
            }
          </div>
          <button className='btn update-btn' onClick={() => {navigate(`/groups/edit/${group._id}`)}}>Update</button>
        </div>

        {!loading && 
          <div className='group-concert-container'>
            <h3 className='group-concert-title'>View and update your concerts:</h3>
            <button 
              className='btn create-btn group-concert-btn'
              onClick={() => navigate('/new-concert')}
            >Add a concert</button>
            {group.concerts && group.concerts.map((concert) => (
              <div className='group-concert' key={concert._id} onClick={() => navigate(`/concerts/edit/${concert._id}`)}>
                  <ConcertDetails concert={concert} />
              </div>
            ))}
          </div>
        }

      </>}
      <button onClick={handleDelete} disabled={loading} className='btn delete-btn group-del'>Delete group</button>
    </>
  )
}
