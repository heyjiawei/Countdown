import React from 'react'
import { calculateDisplayWidth } from './Utility';

import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionEdit from 'material-ui/svg-icons/content/create'

import BlockLayout from './CountdownBlockLayout';
import InlineBlockLayout from './CountdownInlineBlockLayout';

export default class Countdown extends React.Component {
	render () {
		const CountdownStyle = {
			timerList: {
				listStyleType: "none",
				margin: "0.2em 0em"
			},
			titleDivWithinDayDiv: {
				fontFamily: "Roboto, sans-serif"
			},
			buttonList: {
				paddingLeft: "0em"
			}
		}

		let details = null;
		if (calculateDisplayWidth(this.props.days) < 75) {
			details = <InlineBlockLayout {...this.props} />
		} else {
			details = <BlockLayout {...this.props} />
		}

		return (
			<li style={CountdownStyle.timerList}>
				{details}
				{this.props.toShow ?
					<ul style={CountdownStyle.buttonList}>
						<IconButton
							tooltip="Delete"
							tooltipPosition="bottom-center"
							onClick={this.props.onDelete}
						>
							<ActionDelete />
						</IconButton>
						<IconButton
							tooltip="Edit"
							tooltipPosition="bottom-center"
							onClick={this.props.onEdit}
						>
							<ActionEdit />
						</IconButton>
					</ul>
				: null}
			</li>
		)
	}
}
