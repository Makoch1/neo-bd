import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'

const mockData = {
    "links": {
        "self": "http://api.nasa.gov/neo/rest/v1/neo/3673598?api_key=w3MYDZgR8RjbHQk9XT1CpzIafl5HB8elSVvuOz7w"
    },
    "id": "3673598",
    "neo_reference_id": "3673598",
    "name": "(2014 LZ20)",
    "designation": "2014 LZ20",
    "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3673598",
    "absolute_magnitude_h": 24.46,
    "estimated_diameter": {
        "kilometers": {
            "estimated_diameter_min": 0.0340843469,
            "estimated_diameter_max": 0.0762149166
        },
        "meters": {
            "estimated_diameter_min": 34.084346887,
            "estimated_diameter_max": 76.214916608
        },
        "miles": {
            "estimated_diameter_min": 0.0211790247,
            "estimated_diameter_max": 0.0473577389
        },
        "feet": {
            "estimated_diameter_min": 111.8252886407,
            "estimated_diameter_max": 250.0489470042
        }
    },
    "orbital_data": {
        "orbit_id": "9",
        "orbit_determination_date": "2023-05-29 07:12:02",
        "first_observation_date": "2014-06-06",
        "last_observation_date": "2023-05-29",
        "data_arc_in_days": 3279,
        "observations_used": 30,
        "orbit_uncertainty": "2",
        "minimum_orbit_intersection": ".0284738",
        "jupiter_tisserand_invariant": "7.649",
        "epoch_osculation": "2460200.5",
        "eccentricity": ".4324085611038268",
        "semi_major_axis": ".7465314891607432",
        "inclination": "6.134953261237755",
        "ascending_node_longitude": "79.62778972291204",
        "orbital_period": "235.5974707357003",
        "perihelion_distance": ".4237248821140491",
        "perihelion_argument": "355.1824320010747",
        "aphelion_distance": "1.069338096207437",
        "perihelion_time": "2460229.234039176177",
        "mean_anomaly": "316.0935265089154",
        "mean_motion": "1.5280299863824",
        "equinox": "J2000",
        "orbit_class": {
            "orbit_class_type": "ATE",
            "orbit_class_description": "Near-Earth asteroid orbits similar to that of 2062 Aten",
            "orbit_class_range": "a (semi-major axis) < 1.0 AU; q (perihelion) > 0.983 AU"
        }
    }
}


test("Data loads correctly", async () => {
    render(<App />)
    jest.spyOn(global, 'fetch').mockResolvedValue({json: jest.fn().mockResolvedValue(mockData)})

    await waitFor(async () => expect(await screen.findByText(/2014 LZ20/i)).toBeInTheDocument(), {timeout:4000})
})