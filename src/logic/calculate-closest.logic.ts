function calculateClosestNumber(startNumber: number, dividers: number[]): number {
	let result = startNumber;

	while (true) {
		result += 1;

		let appropriate = true;

		for (let divider of dividers) {
			if (result % divider !== 0) {
				appropriate = false;
			}
		}

		if (appropriate) {
			break;
		}
	}

	return result;
}

export { calculateClosestNumber };
