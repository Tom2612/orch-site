import React, { useState } from 'react'

export default function ConcertForm() {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [payStatus, setPayStatus] = useState(false);
    const [piece, setPiece] = useState([]);
    const [pieces, setPieces] = useState([]);
    const [instrument, setInstrument] = useState('');
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

    const handleAddInstrument = (e) => {
      e.preventDefault();
      setInstruments(instruments.concat(instrument));
      setInstrument('');
      console.log(instruments);
    }

    const handleRemoveInstrument = (instrument) => {
      setInstruments(instruments.filter(a => a !== instrument));
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

      {/* {Change this to a selection?} */}
      <label>Pieces</label>
      <input 
        type='text' 
        name='concert-pieces'
        onChange={(e) => setPiece(e.target.value)}
        value={piece}
      />

      <label>Add Instruments</label>
      <input 
        type='text' 
        name='concert-instr'
        onChange={(e) => setInstrument(e.target.value)}
        value={instrument}
        placeholder='Keep adding'
      />
      <button onClick={handleAddInstrument}>Add</button>
      <div>
        {instruments.length > 0 && instruments.map((instrument) => (
          <div key={instrument}>
            <p>{instrument}</p>
            <button onClick={() => handleRemoveInstrument(instrument)}>Remove</button>
          </div>
        ))}
      </div>
      <button>Create Concert</button>

    </form>
  )
}
