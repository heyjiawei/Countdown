import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'

import CountdownApp from '../components/CountdownApp'

injectTapEventPlugin()

// class CountdownApp extends React.Component {
// 	constructor() {
// 		super()
// 		this.state = {
// 			editId: -1,
// 			countdowns: [
// 				{title: 'Driving Practice', date: new Date('2017-07-29'), color: '#8bc34a', toShow: false},
// 				{title: 'Ragnarok, always since you give me energy, when you are sad, i will be by your side. Even if you take my side, as long as i have someone as fine as you, i think ill appreciate if i continue this super duper long elastic static sentence and get this tested later', date: new Date('2017-08-15'), color: '#8bc34a', toShow: false},
// 				{title: 'Christmas', date: new Date('2018-08-25'), color: '#8bc34a', toShow: false},
// 				{title: 'Ragnarok, always since you give me energy, when you are sad, i will be by your side. Even if you take my side, as long as i have someone as fine as you, i think ill appreciate if i continue this super duper long elastic static sentence and get this tested later', date: new Date('2020-12-25'), color: '#2196f3', toShow: false},
// 				{title: 'Ragnarok, always since you give me energy, when you are sad, i will be by your side. Even if you take my side, as long as i have someone as fine as you, i think ill appreciate if i continue this super duper long elastic static sentence and get this tested later', date: new Date('2018-05-25'), color: '#2196f3', toShow: false}
// 			]
// 		}
// 	}
//
// 	// Checks if the submitted form is an update or a new entry
// 	// before updating or adding accordingly
// 	handleCountdownForm(data) {
// 		// Check if it is an update
// 		if (this.state.editId > -1) {
// 			const index = this.state.editId
// 			let countdowns = this.state.countdowns.slice()
// 			countdowns[index] = data
// 			this.setState({
// 				title: '',
// 				date: '',
// 				color: '',
// 				editId: -1,
// 				countdowns
// 			})
//
// 		// Otherwise add new entry
// 		} else {
// 			data.toShow = false
// 			const history = this.state.countdowns.slice()
// 			this.setState({
// 				countdowns: history.concat(data),
// 			})
// 		}
// 	}
//
// 	// Toggle buttons group view
// 	handleShowCountdown(index) {
// 		const countdownList = this.state.countdowns.slice()
// 		let countdown = countdownList[index]
// 		countdown.toShow = !countdown.toShow
//
// 		this.setState({
// 			countdowns: countdownList
// 		})
// 	}
//
// 	handleDelete(index) {
// 		const countdowns = [...this.state.countdowns.slice(0, index),
// 		...this.state.countdowns.slice(index+1)]
//
// 		this.setState({
// 			countdowns
// 		})
// 	}
//
// 	handleEdit(index) {
// 		const countdownList = this.state.countdowns
// 		const countdown = countdownList[index]
// 		this.setState({
// 			title: countdown.title,
// 			date: countdown.date,
// 			color: countdown.color,
// 			editId: index
// 		})
// 	}
//
// 	handleCancelEdit() {
// 		this.setState({
// 			title: '',
// 			date: '',
// 			color: '',
// 			editId: -1,
// 		})
// 	}
//
// 	render() {
// 		return (
// 			<div>
// 				<CountdownForm
// 					title={this.state.title}
// 					date={this.state.date}
// 					color={this.state.color}
// 					editId={this.state.editId}
// 					onCancelEdit={() => this.handleCancelEdit()}
// 					onSubmit={(data) => this.handleCountdownForm(data)}
// 				/>
// 				<CountdownList
// 					countdowns={this.state.countdowns}
// 					onClick={(index) => this.handleShowCountdown(index)}
// 					onEdit={(index) => this.handleEdit(index)}
// 					onDelete={(index) => this.handleDelete(index)}
// 				/>
// 			</div>
// 		)
// 	}
// }

ReactDOM.render(
	<MuiThemeProvider>
		<CountdownApp />
	</MuiThemeProvider>,
	document.getElementById('app')
)
