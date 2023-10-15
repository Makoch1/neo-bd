export default function getDiameter(obj, measurement) {
    const symbols = {
        'kilometers': 'km',
        'meters': 'm',
        'miles': 'mi',
        'feet': 'ft'
    }

    if (!Object.keys(symbols).includes(measurement)) {
        return ''
    }

    const min = obj[measurement]['estimated_diameter_min']
    const max = obj[measurement]['estimated_diameter_max']
    const symbol = symbols[measurement]
    
    return `${min.toFixed(5) + symbol} - ${max.toFixed(5) + symbol}`
}