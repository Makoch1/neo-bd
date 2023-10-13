import { useState, useMemo } from 'react'

export default function DateInput({ setUserDate }) {
    const [ date, setDate ] = useState('')

    const today = useMemo(() => {
        const date = new Date()
        return date.toISOString().split('T')[0]
    }, [])

    function handleChange(event) {
        setDate(event.target.value)
        setUserDate(event.target.value)
    }

    return (
        <div className='input-group-inline'>
            <p className='label'>Date of birth</p>
            <input className="date-input" type='date' max={today} onChange={handleChange} value={date} />
        </div>
    )
}