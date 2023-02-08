import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConcertUpdateForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [date, setDate] = useState(state.date);
  const [location, setLocation] = useState(state.location);
  const [payStatus, setPayStatus] = useState(state.payStatus);

  const [composer, setComposer] = useState('');
  const [title, setTitle] = useState('');
  const [pieces, setPieces] = useState(state.pieces);

  const [instrument, setInstrument] = useState('');
  const [instruments, setInstruments] = useState(state.instruments);

  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

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

  const handleUpdateConcert = async (e, id) => {
    e.preventDefault();

    const updatedConcert = { date, location, payStatus, pieces, instruments }

    const response = await fetch(`http://localhost:4000/api/concerts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedConcert),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } 

    if (response.ok) {
      setError('');
      navigate('/profile', { replace: true })
    }
  }

  const handleDeleteConcert = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/concerts/${id}`, {
        method: 'DELETE'
      })

      const json = await response.json();

      if (!response.ok){
        setError(json.error);
      }
      navigate('/profile', {replace: true});
    } catch(e) {
      setError(e)
    }
  }

  return (
    <form className='concert-form'>
      <h1>Update your concert here</h1>
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
            checked={payStatus ? true : false}
          />
          <label>Paid</label>

          <input 
            type='radio' 
            value='false' 
            name='concert-pay'
            onChange={() => setPayStatus(false)}
            checked={!payStatus ? true : false}
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

      <button onClick={(e) => handleUpdateConcert(e, state._id)} type='button'>Update Concert</button>
      <button onClick={(e) => handleDeleteConcert(e, state._id)} type='button'>Delete Concert</button>

      {error && <span className='error-message'>Error: {error}</span>}
    </form>
  )
}
