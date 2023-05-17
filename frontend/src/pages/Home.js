import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='ontainer'>
        <div className='open-message'>
          <h3>Welcome to OpenGroups.</h3>
          <p>Connecting musicians to groups who need you!</p>
        </div>
        <div className='blocks'>
          {/* <div className='block'>
            <h4><span className='material-symbols-outlined'>person</span>Player login</h4>
            <p>Players can find orchestras, choirs, ensembles and groups of all sizes to get experience playing with and helping out. Fancy
              trying out a specific piece? You can search for it here and see if someone has space for you!</p>
            <button className='btn update-btn'>Player</button>
          </div> */}
          <div className='block'>
            <h4><span className='material-symbols-outlined'>group</span>Group login</h4>
            <p>Groups can advertise their concerts, what pieces are being performed and what help they require. If they want, they are able to offer
            financial support (e.g. travel expenses) for players who want to help out!</p>
            <button data-cy='group-login' className='btn update-btn' onClick={() => navigate('/login-group')}>Group</button>
          </div>
        </div>
    </div>
  )
}

export default Home;