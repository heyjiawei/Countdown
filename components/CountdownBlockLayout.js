import React from 'react';
import { calculateDisplayWidth } from './Utility';
import PropTypes from 'prop-types';

export default class BlockLayout extends React.Component {
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
				width: calculateDisplayWidth(this.props.days) + "%",
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
			<div
				className='toggle-option'
				onClick={this.props.onClick} >
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

BlockLayout.propTypes = {
	title: PropTypes.string.isRequired,
	days: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}
