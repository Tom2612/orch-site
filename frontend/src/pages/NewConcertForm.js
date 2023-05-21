import React, { useState } from 'react';

export default function NewConcertForm() {
    const [concert, setConcert] = useState({
        date: '',
        location: '',
        payStatus: false,
        pieces: [{composer: 'Mahler', title: 'Symphony no. 2'}],
        instruments: [],
    });
    const [piece, setPiece] = useState({composer: '', title: ''});
    const [instrument, setInstrument] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;

        setConcert(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleChangePiece = (e) => {
        const { name, value } = e.target;

        setPiece(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const handleChangeInstrument = (e) => {
        setInstrument(e.target.value);
    }

    const handleAddPiece = () => {
        setConcert(prev => ({
            ...prev,
            pieces: [...prev.pieces, piece]
        }));
        setPiece({composer: '', title: ''});
    }

    const handleAddInstrument = () => {
        setConcert(prev => ({
            ...prev,
            instruments: [...prev.instruments, instrument]
        }));
        setInstrument('');
    }

  return (
    <>
        <form>
            <label>Date:</label>
            <input type='date' name='date' value={concert.date} onChange={handleChange}></input>

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
        </form>

        <div>
            <h2>Your concert</h2>
            <p>Date: {concert.date}</p>
            <p>Location: {concert.location}</p>
            <p>Pay Status: {concert.payStatus.toString()}</p>
            <p>Piece: {piece.composer} - {piece.title}</p>
            {concert.pieces.map(piece => {
                return <p>{piece.composer} - {piece.title}</p>
            })}
            <p>Instrument: {instrument}</p>
            {concert.instruments.map(instrument => {
                return <p>{instrument}</p>
            })}
        </div>
    </>
  )
}
