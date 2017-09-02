import React from 'react'
import Countdown from './Countdown'

class CountdownList extends React.Component {
	renderCountdown () {
		return (
			<Countdown 
				days={this.props.days}
				title={this.props.title}
				color={this.props.color}
			/>
		)
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

export default CountdownList