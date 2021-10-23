function clearCli() {
	const lines = process.stdout.getWindowSize()[1];

	for (let i = 0; i < lines; i++) {
		console.log("\r\n");
	}
}

export { clearCli };
