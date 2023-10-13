export default function Switch({ className, options, current, setCurrent }) {
    
    function handleClick() {
        const nextIndex = options.indexOf(current) + 1
        setCurrent(nextIndex === options.length ? options[0] : options[nextIndex])
    }

    return <button className={className} onClick={handleClick}>{current}</button>
}