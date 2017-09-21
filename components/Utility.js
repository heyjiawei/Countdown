export const calculateDisplayWidth = days => {
	if (days < 0) {
		return calculateDisplayWidth(days * -1)
	} else {
		if (days/365 >= 1) {
			return 99
		} else {
			return days/365 * 100
		}
	}
}

export const calculateOffset = date => {
	let today = new Date
	let timeDiff = date.getTime() - today.getTime()
	let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
	return diffDays
}
