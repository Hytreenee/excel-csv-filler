function makeNChars(n, char) {
	let output = ``;

	for (let i = 0; i < n; i++) {
		output += char;
	}

	return output;
}

export { makeNChars };
