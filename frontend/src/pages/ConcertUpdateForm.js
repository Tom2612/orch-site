import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    console.log(state)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    
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
    setPieces(pieces.concat({composer: composer.trim(), title: title.trim()}));
    setTitle('');
    setComposer('');
  }

  const handleRemovePiece = (e, piece) => {
    e.preventDefault();
    setPieces(pieces.filter(a => a !== piece));
  }

  const handleUpdateConcert = async (e, id) => {
    e.preventDefault();
    console.log('updated form!');

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
          checked={payStatus ? true : false}
        />
        <label>unpaid</label>
        <input 
          type='radio' 
          value='false' 
          name='concert-pay'
          onChange={() => setPayStatus(false)}
          checked={!payStatus ? true : false}
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

      {error && <p>Error: {error}</p>}
    </form>
  )
}
