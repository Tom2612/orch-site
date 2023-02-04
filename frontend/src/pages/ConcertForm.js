import React, { useState } from 'react'

export default function ConcertForm() {
    const [orchestra, setOrchestra] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [payStatus, setPayStatus] = useState(false);
    const [pieces, setPieces] = useState([]);
    const [instruments, setInstruments] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e);
    }

  return (
    <form className='concert-form' onSubmit={handleSubmit}>
      <label>Id</label>
      <input type='text' name='orchestra-id'></input>

      <label>Date</label>
      <input type='date' name='concert-date'></input>

      <label>Location</label>
      <input type='text' name='concert-location'></input>

      <div>
        <label>paid</label>
        <input type='radio' value='true' name='concert-pay' />
        <label>unpaid</label>
        <input type='radio' value='false' name='concert-pay' />
      </div>

      <label>Pieces</label>
      <input type='text' name='concert-pieces'></input>

      <label>Instruments</label>
      <input type='text' name='concert-instr'></input>

      <button>Create Concert</button>

    </form>
  )
}
