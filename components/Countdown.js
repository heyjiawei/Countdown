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

export default class Countdown extends React.Component {
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
		if (calculateWidth(this.props.days) < 75) {
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

class BlockLayout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isTitleTruncated: false
		}
		this.handleWindowResize = this.handleWindowResize.bind(this)
	}

	componentDidMount() {
		// Initial title text resize
		this.handleWindowResize()
		// Add event listener to resize title text when window resizes
		window.addEventListener("resize", this.handleWindowResize)
	}

	// This unmount function is necessary as countdown item
	// can be deleted
	componentWillUnmount() {
		window.removeEventListener("resize", this.handleWindowResize)
	}

	handleWindowResize() {
		if (this.titleSpan.offsetHeight <= this.daysSpan.offsetHeight) {
			this.manageLengthen(this.daysDiv, this.titleSpan)
		}
		if (this.titleSpan.offsetHeight > this.daysSpan.offsetHeight) {
			this.manageTruncate(this.daysSpan, this.titleSpan)
		}
	}

	// Truncate title string to fit within daysDiv container
	// when screen shrink
	manageTruncate(daysSpan, titleSpan) {

		let truncatedTitle = titleSpan.innerText

		while (titleSpan.offsetHeight > daysSpan.offsetHeight) {
			truncatedTitle = truncatedTitle.slice(0, -1)
			titleSpan.innerText = truncatedTitle + "..."
		}

		this.setState({
			isTitleTruncated: true,
			title: truncatedTitle,
		})
	}

	// Lengthen title string to fit within daysDiv container
	// when screen width expands.
	// Only operates on truncated titles. If title was truncated,
	// expand title span width when the screen width is larger than
	// title span by 150px
	manageLengthen(daysDiv, titleSpan) {
		if (this.state.isTitleTruncated) {

			let truncatedIndex = this.state.title.length
			let truncatedTitle = this.state.title
			let pxBeforeTitleSpanWidthExpands = 100

			while (titleSpan.offsetWidth + pxBeforeTitleSpanWidthExpands < daysDiv.offsetWidth) {
				if (truncatedIndex < this.props.title.length) {
					truncatedTitle += this.props.title.charAt(truncatedIndex)
					titleSpan.innerText = truncatedTitle + "..."
					truncatedIndex++
				} else {
					break
				}
			}

			this.setState({
				title: truncatedTitle
			})
		}
	}

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
				padding: "0em 1em"
			}
		}

		return (
			<div onClick={this.props.onClick} >
				<div
					ref={node => this.daysDiv = node}
					style={Style.dayDiv}>
					<span ref={node => this.daysSpan = node}>{this.props.days}</span>
					<span
						style={Style.titleSpan}
						ref={node => this.titleSpan = node}
					>
					{this.props.title}
					</span>
				</div>
			</div>
		)
	}
}

class InlineBlockLayout extends React.Component {
	constructor(props) {
			super(props)
			this.state = {
				isTitleTruncated: false
			}
			this.handleWindowResize = this.handleWindowResize.bind(this)
	}

	componentDidMount() {
		this.handleWindowResize()
		window.addEventListener("resize", this.handleWindowResize)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleWindowResize)
	}

	handleWindowResize() {
		if (this.titleSpan.offsetHeight <= this.daysSpan.offsetHeight) {
			this.manageLengthen(this.timerDiv, this.titleSpan)
		}
		if (this.titleSpan.offsetHeight > this.daysSpan.offsetHeight) {
			this.manageTruncate(this.daysSpan, this.titleSpan)
		}
	}

	manageTruncate(daysSpan, titleSpan) {
		let truncatedTitle = titleSpan.innerText

		while(titleSpan.offsetHeight > daysSpan.offsetHeight) {
			truncatedTitle = truncatedTitle.slice(0, -1)
			titleSpan.innerText = truncatedTitle + "..."
		}

		this.setState({
			isTitleTruncated: true,
			title: truncatedTitle
		})
	}

	manageLengthen(timerDiv, titleSpan) {
		if (this.state.isTitleTruncated) {
			let truncatedIndex = this.state.title.length
			let truncatedTitle = this.state.title
			let daysDivWidth = calculateWidth(this.props.days) + 1
			let pxBeforeTitleSpanWidthExpands = 100

			while (titleSpan.offsetWidth + pxBeforeTitleSpanWidthExpands < timerDiv.offsetWidth - daysDivWidth) {
				if (truncatedIndex < this.props.title.length) {
					truncatedTitle += this.props.title.charAt(truncatedIndex)
					titleSpan.innerText = truncatedTitle + "..."
					truncatedIndex++
				} else {
					break
				}
			}

			this.setState({
				title: truncatedTitle
			})
		}
	}

	render() {
		const Style = {
			timerDiv: {
				fontFamily: "Roboto, sans-serif",
				fontSize: "larger",
				width: "100%",
				height: "36px"
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
				display: "inline"
			}
		}

		return (
			<div
				style={Style.timerDiv}
				onClick={this.props.onClick}
				ref={node => this.timerDiv = node}
			>
				<div style={Style.dayDiv}>
					<span ref={node => this.daysSpan = node}>{this.props.days}</span>
				</div>
				<div style={Style.titleDiv}>
					<span ref={node => this.titleSpan = node}>{this.props.title}</span>
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
