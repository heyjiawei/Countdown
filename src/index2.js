import React from 'react'
import ReactDOM from 'react-dom'

class ButtonsGroup extends React.Component {
	render() {
		return (
			<ul>
				<button onClick={this.props.onDelete}>
					Delete
				</button>
				<button onClick={this.props.onEdit}>
					Edit
				</button>
			</ul>
		)
	}
}

class Countdown extends React.Component {
	render () {
		return (
			<li>
				<div onClick={this.props.onClick} >
					{this.props.title} - {this.props.days}, {this.props.color}
				</div>
				{this.props.toShow ? 
				<ButtonsGroup 
					onDelete={this.props.onDelete} 
					onEdit={this.props.onEdit}
				/> 
				: null}
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
		let props = this.props
		let rows = []
		this.props.countdowns.forEach(function(countdown, index) {
			 rows.push(
			 	<Countdown 
					key={index}
					title={countdown.title} 
					days={calculateOffset(countdown.date)}
					color={countdown.color}
					toShow={countdown.toShow}
					onDelete={() => props.onDelete(index)}
					onClick={() => props.onClick(index)}
					onEdit={() => props.onEdit(index)}
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

class InputField extends React.Component {
	render() {
		return (
			<input 
				type='text'
				placeholder={this.props.placeholder}
				value={this.props.input}
				onChange={this.props.handleInput}
			/>
		)
	}
}

class DatePicker extends React.Component {
	render() {
		return (
			<input 
				type='date'
				value={this.props.date}
				onChange={this.props.handleDateInput}
			/>
		)
	}
}

class CountdownForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: this.props.title || '',
			date: this.props.date || '',
			color: this.props.color || ''
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			title: nextProps.title || '',
			date: nextProps.date || '',
			color: nextProps.color || ''
		})
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
				<InputField 
					placeholder='title'
					input={this.state.title}
					handleInput={(e) => this.handleTitleInput(e)}
				/>
				<DatePicker 
					date={this.state.date}
					handleDateInput={(e) => this.handleDateInput(e)}
				/>
				<InputField 
					placeholder='color'
					input={this.state.color}
					handleInput={(e) => this.handleColorInput(e)}
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
				{title: 'My Birthday', date: '2017-07-25', color: '#cddc39', toShow: false},
				{title: 'Driving Practice', date: '2017-07-29', color: '#8bc34a', toShow: false},
				{title: 'Korean BBQ', date: '2017-08-15', color: '#8bc34a', toShow: false}
			]
		}
	}

	// Checks if the submitted form is an update or a new entry
	// before updating or adding accordingly
	handleCountdownForm(data) {
		// Check if it is an update
		if (this.state.editId) {
			const index = this.state.editId
			let countdowns = this.state.countdowns.slice()
			countdowns[index] = data
			this.setState({
				title: '',
				date: '',
				color: '',
				editId: null,
				countdowns
			})
		
		// Otherwise add new entry
		} else {
			data.toShow = false
			const history = this.state.countdowns.slice()
			this.setState({
				countdowns: history.concat(data),
			})
		}
	}

	// Toggle buttons group view
	handleShowCountdown(index) {
		const countdownList = this.state.countdowns.slice()
		let countdown = countdownList[index]
		countdown.toShow = !countdown.toShow

		this.setState({
			countdowns: countdownList
		})
	}

	handleDelete(index) {
		const countdowns = [...this.state.countdowns.slice(0, index), 
		...this.state.countdowns.slice(index+1)]

		this.setState({
			countdowns
		})
	}

	handleEdit(index) {
		const countdownList = this.state.countdowns
		const countdown = countdownList[index]
		this.setState({
			title: countdown.title,
			date: countdown.date,
			color: countdown.color,
			editId: index
		})
	}

	render() {
		return (
			<div>
				<CountdownForm 
					title={this.state.title}
					date={this.state.date}
					color={this.state.color}
					onSubmit={(data) => {this.handleCountdownForm(data)}}
				/>
				<CountdownList 
					countdowns={this.state.countdowns}
					onClick={(index) => this.handleShowCountdown(index)}
					onEdit={(index) => this.handleEdit(index)}
					onDelete={(index) => this.handleDelete(index)}
				/>
			</div>
		)
	}
}

ReactDOM.render(
	<CountdownApp />,
	document.getElementById('app')
)