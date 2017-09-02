import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import countdownApp from './reducers'

import App from './App';

let store = createStore(countdownApp)

render(
	<Provider store={store}>
		<App />
	</Provider>
	document.getElementById('app')
);