import React from 'react'
import Countdown from '../components/Countdown'
import PropTypes from 'prop-types'

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

CountdownList.propTypes = {
	countdowns: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		date: PropTypes.instanceOf(Date).isRequired,
		color: PropTypes.string.isRequired,
		toShow: PropTypes.bool.isRequired,
		onDelete: PropTypes.func,
		onClick: PropTypes.func,
		onEdit: PropTypes.func
	})).isRequired
}

export default CountdownList
