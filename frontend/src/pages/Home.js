import React from 'react'

const Home = () => {
  return (
    <div className='home'>
        <h2>Home</h2>
        <p>Welcome to OpenGroups.</p>
        <p>Connecting musicians to groups who require your help for upcoming concerts!</p>
        <p>
          Players can find orchestras, choirs, ensembles and groups of all sizes to get experience playing with and helping out. Fancy
          trying out a specific piece? You can search for it here and see if someone has space for you!
        </p>
        <p>Groups can advertise their concerts, what pieces are being performed and what help they require. If they want, they are able to offer
          financial support (e.g. travel expenses) for players who want to help out!
        </p>
        <button>Player</button>
        <button>Group</button>
    </div>
  )
}

export default Home;