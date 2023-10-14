import { useState } from "react"

export default function Switch({ className='', options, setCurrent }) {
    const [ displayed, setDisplayed ] = useState(options[0])
    
    function handleClick() {
        const nextIndex = options.indexOf(displayed) + 1
        setCurrent(nextIndex === options.length ? options[0] : options[nextIndex])
        setDisplayed(nextIndex === options.length ? options[0] : options[nextIndex])
    }

    return <button className={className} onClick={handleClick}>{displayed}</button>
}