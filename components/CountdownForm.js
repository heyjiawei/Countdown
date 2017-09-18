import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { CirclePicker } from 'react-color'
import PropTypes from 'prop-types'

export default class CountdownForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			title: '',
			date: {},
			color: '#000000',
			id: '',
			formErrors: {
				title: '',
				date: ''
			},
			isFormValid: false
		}
	}

	componentWillReceiveProps(nextProps) {
		// Update state when edit button is clicked.
		// Otherwise, ignore nextProps to prevent
		// controlled component from turning into
		// uncontrolled component
		const data = nextProps.data;
		if (data.id.length > 0) {
			this.setState({
				open: true,
				title: data.title,
				date: data.date,
				color: data.color,
				id: data.id
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
		// onCancelEdit function so form.id will be
		// set to false when the dialog is closed
		this.props.onCancelEdit()
		this.reset()
	}

	validateForm() {
		let isTitleValid = (this.state.title.trim().length > 0);
		let isDateValid = (Object.prototype.toString.call(this.state.date) === '[object Date]')
		let errorMsg = 'This field is required'
		this.setState({
			title: this.state.title.trim(),
			isFormValid: isTitleValid && isDateValid,
			formErrors: {
				title: isTitleValid ? '' : errorMsg,
				date: isDateValid ? '' : errorMsg
			}
		}, () => this.handleSubmit())
	}

	handleSubmit() {
		if (this.state.isFormValid) {
			this.props.onSubmit({
				id: this.state.id,
				title: this.state.title,
				color: this.state.color,
				date: this.state.date
			}, this.reset())
		}
	}

	reset() {
		this.setState({
			open: false,
			title: '',
			date: {},
			color: '#000000',
			id: '',
			formErrors: {
				title: '',
				date: ''
			},
			isFormValid: false
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

	getDialogTitle() {
		let title = " Countdown"
		if (this.state.id.length === 0) {
			return "Add" + title
		} else {
			return "Edit" + title
		}
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
				onClick={() => this.validateForm()}
			/>
		]
		return (
			<div>
				<RaisedButton
					label="Add Countdown"
					onClick={() => this.handleOpenDialog()}
				/>
				<Dialog
					title={this.getDialogTitle()}
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
							errorText={this.state.formErrors.title}
							onChange={(event, newValue) => this.handleTitleInput(newValue)}
				    />
						<DatePicker
							formatDate={(date) => this.formatDate(date)}
							mode="landscape"
							hintText="Date"
							value={this.state.date}
							errorText={this.state.formErrors.date}
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

// CountdownForm.propTypes = {
// 	title: PropTypes.string,
// 	date: PropTypes.object,
// 	color: PropTypes.string
// }
