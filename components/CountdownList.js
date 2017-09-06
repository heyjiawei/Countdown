import React from 'react'
import Countdown from '../components/Countdown'

const CountdownListStyle = {
	listContainer: {
		paddingLeft: "0em"
	}
}

const calculateOffset = date => {
	let today = new Date
	let timeDiff = date.getTime() - today.getTime()
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
				<ul style={CountdownListStyle.listContainer}>
					{this.countdowns()}
				</ul>
			</div>
		)
	}
}

export default CountdownList
