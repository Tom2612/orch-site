import React, { useState } from 'react'

export default function ConcertForm() {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [payStatus, setPayStatus] = useState(false);
    const [pieces, setPieces] = useState([]);
    const [instruments, setInstruments] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const concert = { date, location, payStatus, pieces, instruments }

      const response = await fetch('http://localhost:4000/api/concerts', {
        method: 'POST',
        body: JSON.stringify(concert),
        headers: {
            'Content-Type': 'application/json'
        }
      })

      const json = await response.json();

      console.log(json);

    }

  return (
    <form className='concert-form' onSubmit={handleSubmit}>
      <label>Id</label>
      <input 
        type='text' 
        name='orchestra-id'
      />

      <label>Date</label>
      <input 
        type='date' 
        name='concert-date'
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />

      <label>Location</label>
      <input 
        type='text' 
        name='concert-location'
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />

      <div>
        <label>paid</label>
        <input 
          type='radio' 
          value='true' 
          name='concert-pay'
          onChange={() => setPayStatus(true)}
        />
        <label>unpaid</label>
        <input 
          type='radio' 
          value='false' 
          name='concert-pay'
          onChange={() => setPayStatus(false)}
        />
      </div>

      <label>Pieces</label>
      <input 
        type='text' 
        name='concert-pieces'
        onChange={(e) => setPieces(e.target.value)}
        value={pieces}
      />

      <label>Instruments</label>
      <input 
        type='text' 
        name='concert-instr'
        onChange={(e) => setInstruments(e.target.value)}
        value={instruments}
      />

      <button>Create Concert</button>

    </form>
  )
}
