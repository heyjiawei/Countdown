import React from 'react'
import ReactDOM from 'react-dom'

class Countdown extends React.Component {
	render () {
		return (
			<li onDoubleClick={this.props.onDoubleClick}>
				{this.props.title} - {this.props.days}, {this.props.color}
			</li>
		)
	}
}

const calculateOffset = date => {
	let countdown = new Date(date)
	let today = new Date
	let timeDiff = countdown.getTime() - today.getTime()
	let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
	return diffDays
}

class CountdownList extends React.Component {
	countdowns() {
		let onDoubleClick = this.props.onDoubleClick
		let rows = []
		this.props.countdowns.forEach(function(countdown, index) {
			 rows.push(
			 	<Countdown 
					key={index}
					title={countdown.title} 
					days={calculateOffset(countdown.date)}
					color={countdown.color}
					onDoubleClick={() => onDoubleClick(index)}
				/>
			)			
		})
		return rows
	}

	render() {
		return (
			<div>
				<ul>
					{this.countdowns()}
				</ul>
			</div>
		)
	}
}

class AddCountdown extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			date: '',
			color: ''
		}
	}

	handleSubmit(e) {
		e.preventDefault()
		this.props.onSubmit(this.state, this.reset())
	}

	reset() {
		this.setState({
			title: '',
			date: '',
			color: ''
		})
	}

	handleTitleInput(e) {
		this.setState({
			title: e.target.value
		})
	}

	handleDateInput(e) {
		this.setState({
			date: e.target.value
		})
	}

	handleColorInput(e) {
		this.setState({
			color: e.target.value
		})
	}

	render() {
		return (
			<form
				onSubmit={(e) => this.handleSubmit(e)}
			>
				<h3>Countdown </h3>
				<input 
					type='text' 
					placeholder='title'
					value={this.state.title}
					onChange={(e) => this.handleTitleInput(e)}
				/>
				<input 
					type='date' 
					value={this.state.date}
					onChange={(e) => this.handleDateInput(e)}
				/>
				<input 
					type='text'
					placeholder='color'
					value={this.state.color}
					onChange={(e) => this.handleColorInput(e)}
				/>
				<button type='submit'>Submit</button>
			</form>
		)
	}
}

class CountdownApp extends React.Component {
	constructor() {
		super()
		this.state = {
			countdowns: [
				{title: 'My Birthday', date: '2017-07-25', color: '#cddc39'},
				{title: 'Driving Practice', date: '2017-07-29', color: '#8bc34a'},
				{title: 'Korean BBQ', date: '2017-08-15', color: '#8bc34a'}
			],
			isEditForm: false
		}
	}

	handleAddCountdown(data) {
		const history = this.state.countdowns.slice()
		this.setState({
			countdowns: history.concat(data),
		})
	}

	handleDblClick(index) {
		console.log('in handleDblClick')
		console.log(index)

		const countdownList = this.state.countdowns
		const countdown = countdownList[index]
		this.setState({
			title: countdown.title,
			date: countdown.date,
			color: countdown.color,
			isEditForm: true
		})
	}

	render() {
		return (
			<div>
				<AddCountdown 
					titleText={this.state.title}
					date={this.state.date}
					color={this.state.color}
					isEditForm={this.state.isEditForm}
					onSubmit={(data) => {this.handleAddCountdown(data)}}
				/>
				<CountdownList 
					countdowns={this.state.countdowns}
					onDoubleClick={(index) => this.handleDblClick(index)}
				/>
			</div>
		)
	}
}

ReactDOM.render(
	<CountdownApp />,
	document.getElementById('app')
)