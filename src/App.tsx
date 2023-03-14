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
		console.log(text)
		navigator.clipboard.writeText(copyText)
		alert(`Copied ${copyText} to the Clipboard`)
	}

	return (
		<div className='App'>
			<h1>Discord Timestamp Maker</h1>
			<p>Easily create a timestamp that's auto formatted for Discord!</p>
			<div className='main-container'>
				<label htmlFor='datetime'>Date</label>
				<input
					type='date'
					name='date'
					value={date}
					onChange={(e) => setDate(dayjs(e.target.value).format('YYYY-MM-DD'))}
				/>
				<label htmlFor='time'>Time</label>
				<input
					type='time'
					name='time'
					value={time}
					onChange={(e) => setTime(e.target.value)}
				/>

				{copyText !== '' && <h2>{copyText}</h2>}
				{copyText && (
					<button onClick={() => handleCopy(copyText)}>Copy Timestamp</button>
				)}
			</div>
		</div>
	)
}

export default App
