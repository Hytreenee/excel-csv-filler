import { writeFile, utils, WorkBook } from "xlsx";

function makeBook(rangeStart, rangeEnd) {
	const chunkSize = 20000;
	const spacesToAdd = 6;

	const wb: WorkBook = utils.book_new();
	const wsData: Array<Array<string>> = [];

	let chunkSizeCheckpoint = rangeStart;
	let checkpointCounter = 0;

	console.log(`Adding 6 spaces before list, checkpoint #${++checkpointCounter}`);
	for (let i = 0; i < spacesToAdd; i++) {
		wsData.push([""]);
	}

	for (let i = rangeStart; i < rangeEnd; i++) {
		if (chunkSizeCheckpoint + chunkSize === i) {
			console.log(`Reached 20k spaces checkpoint #${++checkpointCounter}`);
			chunkSizeCheckpoint = i;
			for (let i = 0; i < spacesToAdd; i++) {
				wsData.push([""]);
			}
		}
		const fixedStr = fixLengthAndMakeStr(i);
		wsData.push([fixedStr]);
	}

	console.log(`Total lines added ${rangeEnd - rangeStart + checkpointCounter * spacesToAdd}`);
	console.log(`Writing to sheet...`);

	const ws = utils.aoa_to_sheet(Array.from(wsData));
	console.log("Added all lines to sheet");

	utils.book_append_sheet(wb, ws, "Sheet");
	console.log("Appended sheet");

	return wb;
}

function makeNChars(n, char) {
	let output = ``;

	for (let i = 0; i < n; i++) {
		output += char;
	}

	return output;
}

function fixLengthAndMakeStr(num) {
	const str = "" + num;
	const fixedStr = makeNChars(8 - str.length, "0") + str;

	return fixedStr;
}

function init() {
	const globalStart = 8600001;
	const fileLines = 260000;
	const globalEnd = 17000000;

	for (let rangeStart = globalStart, x = 0; rangeStart < globalEnd; rangeStart += 260000, x++) {
		console.log(`Range ${rangeStart} - ${rangeStart + fileLines} | File ${x}`);

		const rangeEnd = rangeStart + fileLines;
		const wb: WorkBook = makeBook(rangeStart, rangeEnd < globalEnd ? rangeEnd : globalEnd + 1);

		console.log("Got complete workbook, saving...");
		writeFile(wb, `./${x}.csv`, { bookType: "csv" });

		console.log("Saved!");
	}
}
init();
