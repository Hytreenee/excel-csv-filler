import { mkdirSync } from "fs";

function createOutputFolder(folderName) {
	try {
		mkdirSync(`${process.cwd()}/${folderName}`);
	} catch (e) {}
}

export { createOutputFolder };
