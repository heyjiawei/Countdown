import React from 'react';
import { calculateDisplayWidth } from './Utility';
import PropTypes from 'prop-types';

export default class InlineBlockLayout extends React.Component {
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
			let daysDivWidth = calculateDisplayWidth(this.props.days) + 1
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
				width: calculateDisplayWidth(this.props.days) + "%",
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
				className='toggle-option'
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

InlineBlockLayout.propTypes = {
	title: PropTypes.string.isRequired,
	days: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}
