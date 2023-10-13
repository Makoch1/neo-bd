export default function getDiameter(obj, measurement) {
    const min = obj[measurement]['estimated_diameter_min']
    const max = obj[measurement]['estimated_diameter_max']

    let notation = ''
    switch (measurement) {
        case 'kilometers':
            notation = 'km'
            break
        case 'meters':
            notation = 'm'
            break
        case 'miles':
            notation = 'mi'
            break
        case 'feet':
            notation = 'ft'
            break
        default:
            notation = ''
            break
    }

    return `${min.toFixed(5) + notation} - ${max.toFixed(5) + notation}`
}