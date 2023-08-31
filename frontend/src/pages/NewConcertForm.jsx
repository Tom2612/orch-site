import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import runValidation from '../features/concerts/formValidator';

export default function NewConcertForm() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [concert, setConcert] = useState({
        date: '',
        location: '',
        payStatus: false,
        pieces: [],
        instruments: [],
    });

    const [piece, setPiece] = useState({composer: '', title: ''});
    const [instrument, setInstrument] = useState('');

    const [loading, setLoading] = useState(false);
    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(false);

        const missingFields = runValidation(concert);
        if (missingFields.length > 0) {
            setError('Please fill in all required fields');
            return setEmptyFields(emptyFields);
        }
        
        if (!user) {
            return setError('You must be logged in to do that.');
        }

        const response = await fetch('http://localhost:4000/api/concerts', {
            method: 'POST',
            body: JSON.stringify(concert),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        })

        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            navigate('/concerts');
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setConcert(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleChangePiece = (e) => {
        const { name, value } = e.target;

        setPiece(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleChangeInstrument = (e) => {
        setInstrument(e.target.value);
    }

    const handleAddPiece = () => {
        if (!piece.composer.length > 0 || !piece.title.length > 0) {
            setEmptyFields(prev => [...prev, 'composer', 'title']);
            return setError('Please type something first.');
        }

        setConcert(prev => ({
            ...prev,
            pieces: [...prev.pieces, piece]
        }));
        setPiece({composer: '', title: ''});
    }

    const handleAddInstrument = () => {
        if (!instrument.length > 0) {
            setEmptyFields(prev => [...prev, 'instruments']);
            return setError('Please type something first.');
        }
        setConcert(prev => ({
            ...prev,
            instruments: [...prev.instruments, instrument]
        }));
        setInstrument('');
    }

    const handleDeletePiece = (composer, title) => {
        setConcert(prev => ({
            ...prev,
            pieces: prev.pieces.filter(piece => {
                return piece.composer !== composer && piece.title !== title;
            })
        }));        
    }

    const handleDeleteInstrument = (instrument) => {
        setConcert(prev => ({
            ...prev,
            instruments: prev.instruments.filter(instr => {
                return instr !== instrument;
            })
        }));
    }

  return (
    <>
        <form>
            <label>Date:</label>
            <input type='date' name='date' value={concert.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]}></input>

            <label>Location</label>
            <input type='text' name='location' value={concert.location} onChange={handleChange}></input>

            <label>Financial support?</label>
            <input type='radio' name='payStatus' value='true' onChange={handleChange}></input><label>Paid</label>
            <input type='radio' name='payStatus' value='false' onChange={handleChange}></input><label>Unpaid</label>
            <br></br>

            <label>Composer:</label>
            <input type='text' name='composer' value={piece.composer} onChange={handleChangePiece}></input>
            <label>Piece:</label>
            <input type='text' name='title' value={piece.title} onChange={handleChangePiece}></input>
            <button type='button' onClick={handleAddPiece}>Add piece</button>

            <br></br>
            <label>Instruments:</label>
            <input type='text' name='instrument' value={instrument} onChange={handleChangeInstrument}></input>
            <button type='button' onClick={handleAddInstrument}>Add Instrument</button>
            <br></br>
            <button onClick={handleSubmit} disabled={loading}>Submit</button>
        </form>

        <div>
            <h2>Your concert</h2>
            <p>Date: {concert.date}</p>
            <p>Location: {concert.location}</p>
            <p>Pay Status: {concert.payStatus.toString()}</p>
            <p>Piece: {piece.composer} - {piece.title}</p>
            {concert.pieces.map(piece => {
                return <p onClick={() => handleDeletePiece(piece.composer, piece.title)}>{piece.composer} - {piece.title}</p>
            })}
            <p>Instrument: {instrument}</p>
            {concert.instruments.map(instrument => {
                return <p onClick={() => handleDeleteInstrument(instrument)}>{instrument}</p>
            })}
        </div>

        <div>
            {error && <p>{error}</p>}
        </div>
    </>
  )
}
