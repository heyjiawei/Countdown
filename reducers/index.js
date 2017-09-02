const initialState = {
	countdowns: [{
		id: 0,
		title: 'Birthday',
		date: '25-07-2017',
		colour: 'blue'
	}, {
		id: 1,
		title: 'Travel to Michu Pichu for 8 days',
		date: '5-09-2017',
		colour: 'orange'
	}, {
		id: 2,
		title: 'The red fox jumped over the green barrel',
		date: '30-12-2017',
		colour: 'green'
	}]
}

function countdownApp(state = initialState, action) {
	switch (action.type) {
		case 'ADD_COUNTDOWN':
			return Object.assign({}, state, {
				countdowns: [
					...state.countdowns,
					{
						title: action.title,
						date: action.date,
						colour: action.colour
					}
				]
			})
		default:
			return state
	}
}

export default countdownApp