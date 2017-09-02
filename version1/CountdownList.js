import React from 'react'
import PropTypes from 'prop-types'
import Countdown from './Countdown'

const CountdownList = ({countdowns, onCountdownClick}) => (
	<ul>
		{countdowns.map(countdown => (
			<Countdown key={countdown.id} 
				{...countdown} 
				onClick={() => onCountdownClick(countdown.id)}
			/>
		))}
	</ul>
)

CountdownList.propTypes = {
	countdowns: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			date: PropTypes.string.isRequired,
			colour: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	onCountdownClick: PropTypes.func.isRequired
}

export default CountdownList