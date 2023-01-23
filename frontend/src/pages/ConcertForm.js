import React, { useState } from 'react'

export default function ConcertForm() {
    const [orchestra, setOrchestra] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [payStatus, setPayStatus] = useState(false);
    const [pieces, setPieces] = useState([]);
    const [instruments, setInstruments] = useState([]);

  return (
    <form className='concert-form'>

    </form>
  )
}
