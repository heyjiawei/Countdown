import React from 'react'
import PropTypes from 'prop-types'

const Countdown = ({onClick, colour, title}) => (
	<li
		onClick={onClick}
		style={{
			color: colour
		}}
	>
		{title}
	</li>
)

Countdown.propTypes = {
	onClick: PropTypes.func.isRequired,
	colour: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
}

export default Countdown