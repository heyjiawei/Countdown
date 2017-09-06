import React from 'react'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionEdit from 'material-ui/svg-icons/content/create'

const calculateWidth = days => {
	if (days < 0) {
		return calculateWidth(days * -1)
	} else {
		if (days/365 >= 1) {
			return 99
		} else {
			return days/365 * 100
		}
	}
}

class Countdown extends React.Component {
	render () {
		const CountdownStyle = {
			timerList: {
				listStyleType: "none",
				margin: "0.2em 0em"
			},
			titleDivWithinDayDiv: {
				fontFamily: "Roboto, sans-serif"
			}
		}

		let details = null;
		if (calculateWidth(this.props.days) < 99) {
			details = <InlineBlockLayout {...this.props} />
		} else {
			details = <BlockLayout {...this.props} />
		}

		return (
			<li style={CountdownStyle.timerList}>
				{details}
				{this.props.toShow ?
				<ButtonsGroup
					onDelete={this.props.onDelete}
					onEdit={this.props.onEdit}
				/>
				: null}
			</li>
		)
	}
}

class InlineBlockLayout extends React.Component {
	render() {
		console.log(this.props)
		const Style = {
			timerDiv: {
				fontFamily: "Roboto, sans-serif",
				fontSize: "larger"
			},
			dayDiv: {
				width: calculateWidth(this.props.days) + "%",
				marginRight: "1%",
				padding: "0em 0.5em",
				display: "inline-block",
				lineHeight: "35px",
				height: "36px",
				color: "white",
				backgroundColor: this.props.color
			},
			titleDiv: {
				fontSize: "smaller",
				opacity: 0.6,
				display: "inline-block"
			}
		}

		return (
			<div
				style={Style.timerDiv}
				onClick={this.props.onClick}
			>
				<div style={Style.dayDiv}>
					{this.props.days}
				</div>
				<div style={Style.titleDiv}>
					{this.props.title}
				</div>
			</div>
		)
	}
}

class BlockLayout extends React.Component {
	render() {
		const Style = {
			dayDiv: {
				width: calculateWidth(this.props.days) + "%",
				marginRight: "1%",
				fontFamily: "Roboto, sans-serif",
				fontSize: "larger",
				padding: "0em 0.5em",
				display: "inline-block",
				lineHeight: "35px",
				height: "36px",
				color: "white",
				backgroundColor: this.props.color
			},
			titleSpan: {
				fontSize: "smaller",
				opacity: 0.8,
				padding: "0em 2em"
			}
		}

		return (
			<div onClick={this.props.onClick} >
				<div style={Style.dayDiv}>
					<span>{this.props.days}</span>
					<span style={Style.titleSpan}>{this.props.title}</span>
				</div>
			</div>
		)
	}
}

class ButtonsGroup extends React.Component {
	render() {
		const OptionsDrawerStyle = {
			buttonList: {
				paddingLeft: "0em"
			}
		}

		return (
			<ul style={OptionsDrawerStyle.buttonList}>
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
		)
	}
}

export default Countdown
