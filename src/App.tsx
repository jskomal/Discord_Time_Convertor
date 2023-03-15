import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import './App.css'

function App() {
	const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
	const [time, setTime] = useState('')
	const [copyText, setCopyText] = useState('')

	useEffect(() => {
		handleParse(date, time)
	}, [date, time])

	const handleParse = (inputDate: string, inputTime: string) => {
		if (!inputTime) return
		const [hour, minute] = inputTime.split(':')
		const now = dayjs(inputDate).hour(parseInt(hour)).minute(parseInt(minute))
		setCopyText(`<t:${now.unix()}>`)
	}

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text)
		alert(`Copied ${text} to the Clipboard`)
	}

	return (
		<div className='App'>
			<h1 className='fade-in'>Discord Timestamp Maker</h1>
			<p className='fade-in'>
				Keep everyone on time with localized timestamps for your next event!
			</p>
			<div className='main-container'>
				<label htmlFor='date'>Date</label>
				<input
					type='date'
					name='date'
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<label htmlFor='time'>Time</label>
				<input
					type='time'
					name='time'
					value={time}
					onChange={(e) => setTime(e.target.value)}
				/>
				{copyText ? <h2>{copyText}</h2> : <h2>Please input a time</h2>}
				<button onClick={() => handleCopy(copyText)} disabled={!copyText}>
					Copy Timestamp
				</button>
			</div>
		</div>
	)
}

export default App
