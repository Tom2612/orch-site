import React, { useState } from 'react'

export default function ConcertForm() {
    
  const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [payStatus, setPayStatus] = useState(false);

    const [composer, setComposer] = useState('');
    const [title, setTitle] = useState('');
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
    }

    const handleRemoveInstrument = (e, instrument) => {
      e.preventDefault();
      setInstruments(instruments.filter(a => a !== instrument));
    }

    const handleAddPiece = (e) => {
      e.preventDefault()
      setPieces(pieces.concat({composer: composer, title: title}));
      setTitle('');
      setComposer('');
    }

    const handleRemovePiece = (e, piece) => {
      e.preventDefault();
      setPieces(pieces.filter(a => a !== piece));
    }

  return (
    <form className='concert-form' onSubmit={handleSubmit}>
      
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

      <div>
        <h4>Add pieces</h4>
        <label>Composer: </label>
        <input 
          type='text' 
          name='composer'
          onChange={(e) => setComposer(e.target.value)}
          value={composer}
        />

        <label>Title: </label>
        <input 
          type='text' 
          name='piece-title' 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button onClick={handleAddPiece}>Add</button>
      </div>
      <div>
        {pieces.length > 0 && pieces.map((piece) => (
          <div key={piece.title}>
            <p>{piece.composer} - {piece.title}</p>
            <button onClick={(e) => handleRemovePiece(e, piece)}>Remove</button>
          </div>
        ))}
      </div>

      <h4>Add Instruments</h4>
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
            <button onClick={(e) => handleRemoveInstrument(e, instrument)}>Remove</button>
          </div>
        ))}
      </div>
      <button>Create Concert</button>
    </form>
  )
}
