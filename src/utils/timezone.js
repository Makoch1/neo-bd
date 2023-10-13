export function toUTCYMD(dateString, timeString) {
    const d = new Date(`${dateString} 0${timeString}`)
    
    const year = d.getUTCFullYear()
    const month = d.getUTCMonth() + 1 > 9 ? d.getUTCMonth() : '0' + (d.getUTCMonth() + 1)
    const day = d.getUTCDate()

    return `${year}-${month}-${day}`    
}

export function getEpochMS(dateString, timeString) {
    const d = new Date(`${dateString} 0${timeString}`)
    
    const ms = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes())
    return ms
}