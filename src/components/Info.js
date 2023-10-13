export default function Info({ className='', label, info }) {
    return (
        <div className={className}>
            <p className="label">{label}</p>
            <p className="info-text">{info}</p>
        </div>
    )
}