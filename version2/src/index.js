import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'

injectTapEventPlugin()

var COUNTDOWNS = [
	{title: 'My Birthday', date: '2017-07-25', color: '#cddc39'},
	{title: 'Driving Practice', date: '2017-07-26', color: '#8bc34a'}
]

render(
	<MuiThemeProvider>
		<App countdowns={COUNTDOWNS} />
	</MuiThemeProvider>,
	document.getElementById('app')
);