import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { CirclePicker } from 'react-color'
// import PropTypes from 'prop-types'

// class InputField extends React.Component {
// 	render() {
// 		return (
// 			<TextField
// 	      floatingLabelText="Title"
// 	    />
// 		)
// 	}
// }

// class DatePicker extends React.Component {
// 	render() {
// 		return (
// 			<input 
// 				type='date'
// 				value={this.props.date}
// 				onChange={this.props.handleDateInput}
// 			/>
// 		)
// 	}
// }

class CountdownForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			title: '',
			date: {},
			color: ''
		}
	}

	componentWillReceiveProps(nextProps) {
		// Update state when edit button is clicked. 
		// Otherwise, ignore nextProps to prevent 
		// controlled component from turning into 
		// uncontrolled component

		if (nextProps.editId > -1) {
			this.setState({
				open: true,
				title: nextProps.title,
				date: nextProps.date,
				color: nextProps.color
			})	
		}
	}

	handleOpenDialog() {
		this.setState({
			open: true
		})
	}

	handleCloseDialog() {
		// Call CountdownApp Component's (parent component)
		// onCancelEdit function so nextProps.editId will be
		// set to -1 when the dialog is closed
		this.props.onCancelEdit()
		this.reset()
	}

	handleSubmit() {
		this.props.onSubmit(this.state, this.reset())
	}

	reset() {
		this.setState({
			open: false,
			title: '',
			date: {},
			color: ''
		})
	}

	handleTitleInput(newValue) {
		this.setState({
			title: newValue
		})
	}

	handleDateInput(dateObj) {
		this.setState({
			date: dateObj
		})
	}

	handleColorInput(color) {
		this.setState({
			color: color.hex
		})
	}

	formatDate(dateObj) {
		let date = dateObj.getDate()
		let month = dateObj.getMonth() + 1
		let year = dateObj.getFullYear()
		return date + "/" + month + "/" + year
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={() => this.handleCloseDialog()}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				onClick={() => this.handleSubmit()}
			/>
		]
		return (
			<div>
				<RaisedButton 
					label="Add Countdown" 
					onClick={() => this.handleOpenDialog()} 
				/>
				<Dialog
					title="<ADD/EDIT> Countdown"
					actions={actions}
					model={false}
					open={this.state.open}
					onRequestClose={() => this.handleCloseDialog()}
					autoScrollBodyContent={true}
				>
					<form>
						<TextField
				      floatingLabelText="Title"
				      name="title"
				      id="title"
				      value={this.state.title}
							onChange={(event, newValue) => this.handleTitleInput(newValue)}
				    />
						<DatePicker 
							formatDate={(date) => this.formatDate(date)}
							mode="landscape"
							hintText="Date"
							value={this.state.date}
							onChange={(e, date) => this.handleDateInput(date)}
						/>
						<CirclePicker
							color={this.state.color}
							onChangeComplete={(color, event) => this.handleColorInput(color)}
						/>
					</form>
				</Dialog>	
			</div>
		)
	}
}

export default CountdownForm