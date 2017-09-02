import React from 'react'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import { CirclePicker } from 'react-color'
import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'

const Countdown = ({days, title}) => (
	<li>
		{days} - {title}
	</li>
)

class CountdownList extends React.Component {
	renderCountdown () {
		this.props.countdowns.forEach(function (countdown) {
			return (
				<Countdown 
					days={countdown.days}
					title={countdown.title}
					color={countdown.color}
				/>
			)
		})
	}

	render () {
		return (
			<div>
				<ul>
					{this.renderCountdown}
				</ul>
			</div>
		)
	}
}

class AddCountdown extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			title: '',
			date: '',
			color: ''
		}
	}

	handleSubmit (e) {
		console.log('in here');
	}

	render () {
		return (
			<div>
				<form
					onSubmit={(e) => this.handleClick(e)}>
					<TextField
			    	floatingLabelText="Title"
			    	value={this.state.title}
			    />
			    <br />
			    <DatePicker 
			    	hintText="Landscape Dialog" 
			    	mode="landscape" />
			    <br />
			    <CirclePicker />
			    <RaisedButton 
			    	label="Primary" 
			    	primary={true} 
			    	type="submit" />
				</form>
			</div>
		)
	}
}

class App extends React.Component {
	render () {
		return (
			<div>
				<h1>Countdown</h1>
				<AddCountdown />
				<CountdownList countdowns={this.props.countdowns} />
			</div>
		)
	}
}

export default App