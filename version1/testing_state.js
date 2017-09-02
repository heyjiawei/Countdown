import { addCountdown } from '../actions'
import { createStore } from 'redux'
import countdownApp from '../reducers'

let store = createStore(countdownApp)

console.log(store.getState())

let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
)

store.dispatch(addCountdown('driving lesson', '21-07-2017', 'pink'))
store.dispatch(addCountdown('start finding a job', '25-07-2017', 'red'))
store.dispatch(addCountdown('Finish final theory', '21-08-2017', 'grey'))

unsubscribe()