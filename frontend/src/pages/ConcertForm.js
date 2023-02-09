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

  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const concert = { date, location, payStatus, pieces, instruments }
    console.log(concert);

    const response = await fetch('http://localhost:4000/api/concerts', {
      method: 'POST',
      body: JSON.stringify(concert),
      headers: {
          'Content-Type': 'application/json'
      }
    })

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      console.log(json);
      setDate('');
      setLocation('');
      setPayStatus(false);
      setPieces([]);
      setInstruments([]);
    }
  }

  const handleAddInstrument = (e) => {
    e.preventDefault();
    if (!instrument) {
      setError('Please add an instrument');
      setEmptyFields(emptyFields.concat('instrument'));
      return 
    }
    setInstruments(instruments.concat(instrument));
    setInstrument('');
    setError('');
    setEmptyFields([]);
  }

  const handleRemoveInstrument = (e, instrument) => {
    e.preventDefault();
    setInstruments(instruments.filter(a => a !== instrument));
  }

  const handleAddPiece = (e) => {
    e.preventDefault()
    if (!composer) {
      setError(`Please add a composer`);
      setEmptyFields(emptyFields.concat('composer'));
      return;
    }

    if(!title) {
      setError('Please add a title');
      setEmptyFields(emptyFields.concat('title'));
      return;
    }

    setPieces(pieces.concat({composer: composer.trim(), title: title.trim()}));
    setTitle('');
    setComposer('');
    setError('');
    setEmptyFields([]);
  }

  const handleRemovePiece = (e, piece) => {
    e.preventDefault();
    setPieces(pieces.filter(a => a !== piece));
  }

  return (
    <form className='concert-form' onSubmit={handleSubmit}>
      <h1>Create your concert here</h1>
      <label>Date</label>
      <input 
        type='date' 
        name='concert-date'
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />

      <label>Venue Name</label>
      <input 
        type='text' 
        name='concert-location'
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />

      <div className='pay-container'>
        <h3>Are you offering financial help to players?</h3>
        <div className='radio-container'>
          <input 
            type='radio' 
            value='true' 
            name='concert-pay'
            onChange={() => setPayStatus(true)}
          />
          <label>Paid</label>

          <input 
            type='radio' 
            value='false' 
            name='concert-pay'
            onChange={() => setPayStatus(false)}
          />
          <label>Unpaid</label>
        </div>
      </div>

      <div className='pieces'>
        <h3>What pieces are being performed?</h3>
        
        <label>Composer: </label>
        <input 
          type='text' 
          name='composer'
          onChange={(e) => setComposer(e.target.value)}
          value={composer}
          className={emptyFields.includes('composer') ? 'error' : ''}
        />

        <label>Title: </label>
        <input 
          type='text' 
          name='piece-title' 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />
        <button className='add-btn' onClick={handleAddPiece}>Add</button>
      </div>
      <div className='pieces-container'>
        {pieces.length > 0 && pieces.map((piece, index) => (
          <div key={index} className='piece'>
            <p><span className='composer'>{piece.composer}</span> - {piece.title}</p>
            <span 
              className='material-symbols-outlined' 
              onClick={(e) => handleRemovePiece(e, piece)}>
                Close
              </span>
          </div>
        ))}
      </div>

      <label>What instruments are required?</label>
      <input 
        type='text' 
        name='concert-instr'
        onChange={(e) => setInstrument(e.target.value)}
        value={instrument}
        placeholder='Instrument'
        className={emptyFields.includes('instrument') ? 'error' : ''}
      />
      <button className='add-btn' onClick={handleAddInstrument}>Add</button>
      <div className='instruments-container'>
        {instruments.length > 0 && instruments.map((instrument) => (
          <div className='instrument' key={instrument}>
            <p>{instrument}</p>
            <span className='material-symbols-outlined' onClick={(e) => handleRemoveInstrument(e, instrument)}>Close</span>
          </div>
        ))}
      </div>
      <button className='create-btn'>Create Concert</button>
      {error && <span className='error-message'>Error: {error}</span>}
    </form>
  )
}
