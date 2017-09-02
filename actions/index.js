let nextId = 3;

export const addCountdown = (title, date, colour) => {
	return {
		type: 'ADD_COUNTDOWN',
		id: nextId++,
		title,
		date,
		colour
	}
}

export const deleteCountdown = id => {
	return {
		type: 'DELETE_COUNTDOWN',
		id
	}
}