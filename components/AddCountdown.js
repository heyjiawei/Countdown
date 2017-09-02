import React from 'react'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import { CirclePicker } from 'react-color'
import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'

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
			    	mode="landscape"
			    	value={this.state.date} />
			    <br />
			    <CirclePicker 
			    	value={this.state.color}/>
			    <RaisedButton 
			    	label="Primary" 
			    	primary={true} 
			    	type="submit" />
				</form>
			</div>
		)
	}
}

// AddCountdown.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	date: PropTypes.string.isRequired,
// 	color: PropTypes.string.isRequired
// }
/*
const AddCountdown = () => {
	const handleSubmit = (e) => {
		console.log(e)
		console.log("in handleSubmit")
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit} >
				<TextField
		    	floatingLabelText="Title"
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
*/

export default AddCountdown