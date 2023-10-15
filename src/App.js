import './App.css';
import { useState , useEffect } from 'react'
import Switch from './components/Switch.js'
import DateInput from './components/DateInput.js'
import Info from './components/Info.js'
import TimeInput from './components/TimeInput';
import { toUTCYMD , getEpochMS } from './utils/timezone';
import  getDiameter  from './utils/getDiameter'

function LandingPage(){
	return (
		<div className='landing-page full-screen'>
			<div className='container container-slim'>
				<h1 className='text-centered text-xxl white-text'>NEO buddy</h1>
				<p className='white-text'>Curious if an asteroid flew by on your birthday? Or any other important day?</p>
				<p className='white-text'>
					Just input your birthdate, and optionally the time as well.
					Pick whether you want to find the closest by distance, or one that passed by nearest to the time specified (defaults to 12 midnight).
				</p>
				<a href='#main-body'><button className='button-to-right far-to-top shadowed'>Find NEO buddy!</button></a>
				<a href='https://github.com/Makoch1/neo-bd' target='_blank' rel='noreferrer'><p className='white-text'>Check out the github repo!</p></a>
			</div>
		</div>
	)
}

function DiameterDisplay({ info }) {
	const measurements = ['meters', 'kilometers', 'feet', 'miles']
	const [ measurement, setMeasurement ] = useState(measurements[0])

	return (
		<div>
			<div className='flex'>
				<p className='label'>Estimated diameter in</p>
				<Switch className={'button button-discreet'} options={measurements} current={measurement} setCurrent={setMeasurement}/>
			</div>
			<p className='info-text'>{getDiameter(info['estimated_diameter'], measurement)}</p>
		</div>
	)
}

function NeoInfo({ filterBase='Distance' , userTime,  userDate }) {
	const [ info, setInfo ] = useState(null)
	
	const userUTCDate = toUTCYMD(userDate, userTime)
	const userTimeMs = getEpochMS(userDate, userTime)
	
	// get neo info from nasa
	useEffect(() => {
		fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${userUTCDate}&end_date=${userUTCDate}&api_key=${process.env.REACT_APP_API_KEY}`)
		.then(response => response.json())
		.then(response => {
			const allObjects = response['near_earth_objects'][userUTCDate]

			// find the nearest object
			let nearestValue = 0
			let objectIndex = 0
			for (let i = 0; i < allObjects.length; i++) {
				const distanceValue = Number(allObjects[i]['close_approach_data'][0]['miss_distance']['kilometers'])
				const epochValue = Number(allObjects[i]['close_approach_data'][0]['epoch_date_close_approach'])

				// either it is by distance or by time
				const objectValue = filterBase === 'Distance' ? distanceValue : Math.abs(epochValue - userTimeMs)
				if (nearestValue === 0 || objectValue < nearestValue){
					[ nearestValue, objectIndex ] = [ objectValue, i ]
				}
			}			

			// next fetch request returns detailed info about the nearest object
			return fetch(allObjects[objectIndex]['links']['self'])
		})
		.then(response => response.json())
		.then(response => setInfo(response))
		.catch(error => console.log(error))
	}, [filterBase, userUTCDate, userTimeMs])

	// if data still has not loaded
	return !info ? <div className='container shadowed'><p>Loading...</p></div> : (
		// if loaded
		<div className='container shadowed'>
			<h1 className='category'>General Info</h1>
			<div className='flex'>
				<Info label={'Name'} info={info['name'].replace(/[{()}]/g, '')}/>
				<Info className={'spaced-left'} label={'First observed on'} info={info['orbital_data']['first_observation_date']}/>
				<Info className={'spaced-left'} label={'Last observed on'} info={info['orbital_data']['last_observation_date']}/>
			</div>
			<div className='flex'>
				<DiameterDisplay info={info} />
				<Info className={'spaced-left'} label={'Absolute magnitude'} info={info['absolute_magnitude_h']}/>
			</div>
			<h1 className='category'>Orbital Data</h1>
			<div className='info-group flex'>
				<Info className={''} label={'Orbital period'} info={Number(info['orbital_data']['orbital_period']).toFixed(2) + ' days'}/>
				<Info className={'spaced-left'} 
					label={'Closest distance to sun'} info={Number(info['orbital_data']['perihelion_distance']).toFixed(2) + ' AU'}
				/>
				<Info className={'spaced-left'} 
					label={'Farthest distance to sun'} info={Number(info['orbital_data']['aphelion_distance']).toFixed(2) + ' AU'}
				/>
			</div>
		</div>
	)
}	

function App() {
	// What the app narrows its results by, and which near earth object it picks
	// by the nearest distance or nearest time
	// default is by distance
	const filters = ['Distance', 'Time']
	const [ filterType , setFilterType ] = useState(filters[0])
	const [ userDate, setUserDate ] = useState('')
	const [ userTime , setUserTime ] = useState('00:00')
	
	return (
		<>
		<LandingPage />
		<div id='main-body' className='main-body full-screen'>
			<div className='container'>
				<h1 className='category'>Your NEO buddy!</h1>
			</div>
			<NeoInfo userDate={userDate} filterBase={filterType} userTime={userTime}/>
			<div className='container user-info'>
				<div className='flex'>
					<DateInput setUserDate={setUserDate} />
					<TimeInput setUserTime={setUserTime} />
				</div>
				<p className="label">Sort by closest: </p>		
				<Switch className={'button-to-right shadowed-sm'} options={filters} current={filterType} setCurrent={setFilterType} />
			</div>
    	</div>
		</>
  	);
}

export default App;
