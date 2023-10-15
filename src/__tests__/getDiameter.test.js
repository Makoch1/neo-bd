import getDiameter from "../utils/getDiameter";

const mockObj = {
    'kilometers': {
        'estimated_diameter_min': 1,
        'estimated_diameter_max': 2
    },
    'meters': {
        'estimated_diameter_min': 10,
        'estimated_diameter_max': 20
    },
    'miles': {
        'estimated_diameter_min': 100,
        'estimated_diameter_max': 200
    },
    'feet': {
        'estimated_diameter_min': 1000,
        'estimated_diameter_max': 2000
    }
}

test("getDiameter returns empty string if passed invalid measurement", () => {
    const fnCall = getDiameter(mockObj, 'kilometer')

    expect(fnCall).toBe('')
})

test("getDiameter returns correct string if passed in valid measurement", () => {
    const fnCall = getDiameter(mockObj, 'kilometers')

    expect(fnCall).toBe('1.00000km - 2.00000km')
})
