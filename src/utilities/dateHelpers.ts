export const getMonthName = (index: number) => {
	let name
	switch (index) {
	case 0:
		name = "January"
		break
	case 1:
		name = "February"
		break
	case 2:
		name = "March"
		break
	case 3:
		name = "April"
		break
	case 4:
		name = "May"
		break
	case 5:
		name = "June"
		break
	case 6:
		name = "July"
		break
	case 7:
		name = "August"
		break
	case 8:
		name = "September"
		break
	case 9:
		name = "October"
		break
	case 10:
		name = "November"
		break
	case 11:
		name = "December"
		break
	default:
		break
	}
	return name
}

export const subtractMonths = (month: number, subtract: number) => {
	const remainder = month - subtract
	return remainder >= 0 ? month - subtract : 12 - Math.abs(remainder)
}

export const formatDateToTimestamp = (date: Date) => {
	return Number(date)
}

export const formatTimestampToDate = (timestamp: number) => {
	return new Date(timestamp / 1000)
}
