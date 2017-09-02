import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createStore } from 'redux'
import countdownApp from '../reducers'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Appbar from '../components/Appbar'

injectTapEventPlugin()
let store = createStore(countdownApp)

render(
	<MuiThemeProvider store={store}>
		<Appbar />
	</MuiThemeProvider>,
	document.getElementById('app')
);