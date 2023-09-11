import React, { useState } from 'react';

export default function ConcertForm(props) {

    const [piece, setPiece] = useState({composer: '', title: ''});
    const [instrument, setInstrument] = useState('');

    const [emptyFields, setEmptyFields] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        props.setConcert(prev => ({
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

        props.setConcert(prev => ({
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
        props.setConcert(prev => ({
            ...prev,
            instruments: [...prev.instruments, instrument]
        }));
        setInstrument('');
    }

    const handleDeletePiece = (composer, title) => {
        props.setConcert(prev => ({
            ...prev,
            pieces: prev.pieces.filter(piece => !(piece.composer == composer && piece.title == title))
        }));        
    }

    const handleDeleteInstrument = (instrument) => {
        props.setConcert(prev => ({
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
            <input type='date' name='date' value={props.concert.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]}></input>

            <label>Location</label>
            <input type='text' name='location' value={props.concert.location} onChange={handleChange}></input>

            <label htmlFor='region'>Region</label>
            <select name='region' id='region' onChange={handleChange} value={props.concert.region}>
                <option value={''}>-- Select Region --</option>
                <option value={'East Midlands'}>East Midlands</option>
                <option value={'East of England'}>East of England</option>
                <option value={'London'}>London</option>
                <option value={'North East'}>North East</option>
                <option value={'North West'}>North West</option>
                <option value={'Northern Ireland'}>Northern Ireland</option>
                <option value={'Scotland'}>Scotland</option>
                <option value={'South East'}>South East</option>
                <option value={'South West'}>South West</option>
                <option value={'Wales'}>Wales</option>
                <option value={'West Midlands'}>West Midlands</option>
                <option value={'Yorkshire and The Humber'}>Yorkshire and The Humber</option>
            </select>

            <label>Financial support?</label>
            <input type='radio' name='payStatus' id='paid' value='true' checked={props.concert.payStatus === 'true'} onChange={handleChange}></input><label htmlFor='paid'>Paid</label>
            <input type='radio' name='payStatus' id='unpaid' value='false' checked={props.concert.payStatus  === 'false'} onChange={handleChange}></input><label htmlFor='unpaid'>Unpaid</label>
            <br></br>

            <label>Composer:</label>
            <input type='text' name='composer' value={piece.composer} onChange={handleChangePiece}></input>
            <label>Piece:</label>
            <input type='text' name='title' value={piece.title} onChange={handleChangePiece}></input>
            <button type='button' onClick={handleAddPiece}>Add piece</button>

            <div>
                {props.concert.pieces.map(piece => {
                    return <p key={`${piece.composer}.${piece.title}`} onClick={() => handleDeletePiece(piece.composer, piece.title)}>{piece.composer} - {piece.title}</p>
                })}
            </div>

            <br></br>
            <label>Instruments:</label>
            <input type='text' name='instrument' value={instrument} onChange={handleChangeInstrument}></input>
            <button type='button' onClick={handleAddInstrument}>Add Instrument</button>
            <div>
                {props.concert.instruments.map(instrument => {
                    return <p key={instrument} onClick={() => handleDeleteInstrument(instrument)}>{instrument}</p>
                })}
            </div>
            
            <button onClick={props.handleSubmit} disabled={props.loading}>Submit</button>
        </form>

        <div>
            {error && <p>{error}</p>}
        </div>
    </>
  )
}
