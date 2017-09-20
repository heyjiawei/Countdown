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
