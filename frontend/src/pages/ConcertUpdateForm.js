import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ConcertUpdateForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [payStatus, setPayStatus] = useState('');

  const [composer, setComposer] = useState('');
  const [title, setTitle] = useState('');
  const [pieces, setPieces] = useState('');

  const [instrument, setInstrument] = useState('');
  const [instruments, setInstruments] = useState('');

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcert = async () => {
      const response = await fetch(`http://localhost:4000/api/concerts/edit/${id}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (!response.ok) {
        alert('You are not authorised to edit this concert.');
        navigate(-1);
      }

      if (response.ok) {
        setDate(json.date);
        setLocation(json.location);
        setPayStatus(json.payStatus);
        setPieces(json.pieces);
        setInstruments(json.instruments);
        setLoading(false);
      }
    }

    fetchConcert();

  }, [id, navigate, user])

  

  const handleAddInstrument = (e) => {
    e.preventDefault();
    if (!instrument) {
      setError('Please add an instrument');
      setEmptyFields(emptyFields.concat('instrument'));
      return 
    }
    setInstruments(instruments.concat(instrument));
    setInstrument('');
    setError(null);
    setEmptyFields(emptyFields.filter(field => {
      return field !== 'instruments' && field !== 'instrument';
    }));
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
    setError(null);
    setEmptyFields(emptyFields.filter(field => {
      return field !== 'pieces';
    }));
  }

  const handleRemovePiece = (e, piece) => {
    e.preventDefault();
    setPieces(pieces.filter(a => a !== piece));
  }

  const handleUpdateConcert = async (e, id) => {
    e.preventDefault();

    // Concert validtors frontend
    if (!date) {
      setEmptyFields(emptyFields.concat('date'));
    }
    if (!location) {
      setEmptyFields(emptyFields.concat('location'));
    }
    if (pieces.length === 0) {
      setEmptyFields(emptyFields.concat('pieces'));
    }
    if (instruments.length === 0) {
      setEmptyFields(emptyFields.concat('instruments'));
    }
    if (emptyFields.length > 1) {
      return setError('Please fill in the required fields');
    }

    const updatedConcert = { date, location, payStatus, pieces, instruments }

    const response = await fetch(`http://localhost:4000/api/concerts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedConcert),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearuer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } 

    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      navigate('/groups/profile');
    }
  }

  const handleDeleteConcert = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/api/concerts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json();

      if (!response.ok){
        setError(json.error);
      }
      navigate('/groups/profile');
    } catch(e) {
      setError(e.message);
    }
  }

  return ( 
    <>
      { !loading && 
        <form className='concert-form'>
          <h1>Update your concert here</h1>

          <div className='form-top'>
            <label>Date</label>
            <input 
              type='date' 
              name='concert-date'
              onChange={(e) => {
                setDate(e.target.value)
                return setEmptyFields(emptyFields.filter(field => field !== 'date'))
              }}
              value={date}
              className={emptyFields.includes('date') ? 'error' : 'input'}
            />

            <label>Venue Name</label>
            <input 
              type='text' 
              name='concert-location'
              onChange={(e) => {
                setLocation(e.target.value)
                return setEmptyFields(emptyFields.filter(field => field !== 'location'))
              }}
              value={location}
              className={emptyFields.includes('location') ? 'error concert-location' : 'input concert-location'}
            />
          </div>

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
              className={emptyFields.includes('composer') || emptyFields.includes('pieces') ? 'error' : 'input'}
            />

            <label>Title: </label>
            <input 
              type='text' 
              name='piece-title' 
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={emptyFields.includes('title') || emptyFields.includes('pieces') ? 'error' : 'input'}
            />
            <button className='btn add-btn' onClick={handleAddPiece}>Add</button>
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
            className={emptyFields.includes('instrument') || emptyFields.includes('instruments') ? 'error' : 'input'}
          />
          <button className='btn add-btn' onClick={handleAddInstrument}>Add</button>
          <div className='instruments-container'>
            {instruments.length > 0 && instruments.map((instrument) => (
              <div className='instrument' key={instrument}>
                <p>{instrument}</p>
                <span className='material-symbols-outlined' onClick={(e) => handleRemoveInstrument(e, instrument)}>Close</span>
              </div>
            ))}
          </div>

          <button className='btn update-btn' onClick={(e) => handleUpdateConcert(e, id)} type='button'>Update Concert</button>
          <button className='btn delete-btn' onClick={(e) => handleDeleteConcert(e, id)} type='button'>Delete Concert</button>

          {error && <span className='error-message'>Error: {error}</span>}
        </form>
      }
    </>
  )
}
