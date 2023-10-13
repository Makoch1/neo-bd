import { useState } from "react";

export default function TimeInput({ inputStyle, setUserTime }) {
    const [ hour , setHour ] = useState('')
    const [ minute , setMinute ] = useState('')

    function isValidTime(input, maxNum) {
        const parsedInput = parseFloat(input)
        // check if it is a number
        if ((isNaN(input) || isNaN(parsedInput)) && input !== '') {
            return false
        }
        // check if it is less than the max num and more than 0
        if (parsedInput > maxNum || parsedInput < 0) {
            return false
        }

        return true
    }

    function handleChange(event) {
        const input = event.target.value
        const timeType = event.target.id
        const maxNum = timeType === 'hour' ? 23 : 60

        if (!isValidTime(input, maxNum)) {
            setUserTime(`${hour}:${minute}`)
            return timeType === 'hour' ? setHour(hour) : setMinute(minute)
        }

        if (timeType === 'hour') {
            setHour(input)
            setUserTime(`${input}:${minute}`)
        } else {
            setMinute(input)
            setUserTime(`${hour}:${input}`)
        }
    }

    return (
        <div>
            <p className="label">Time of birth</p>
            <input className="time-input" id="hour" type="text" onChange={handleChange} value={hour} placeholder="hr" />
            <input className="time-input" id="minute" type="text" onChange={handleChange} value={minute} placeholder="min" />
        </div>
    )
}