import { mkdirSync } from "fs";
import { writeFile, utils, WorkBook } from "xlsx";
import { CliPromptList, CliPromptNum } from "./core/cli-prompt";

function makeBook(rangeStart, rangeEnd, spacesPerChunk, chunkSize, additionalNullLines) {
	const wb: WorkBook = utils.book_new();
	const wsData: Array<Array<string>> = [];

	let chunkSizeCheckpoint = rangeStart;
	let checkpointCounter = 0;

	for (let i = rangeStart; i < rangeEnd; i++) {
		if (chunkSizeCheckpoint === i) {
			console.log(`Reached ${chunkSize} space checkpoint #${++checkpointCounter}`);
			chunkSizeCheckpoint += chunkSize;
			for (let i = 0; i < spacesPerChunk; i++) {
				wsData.push([""]);
			}
		}
		const fixedStr = fixLengthAndMakeStr(i);
		wsData.push([fixedStr]);
	}

	if (additionalNullLines) {
		console.log(`Adding ${additionalNullLines} null lines to the end - fix`);
		for (let i = 0; i < additionalNullLines; i++) {
			wsData.push(["00000000"]);
		}
	}

	console.log(
		`\nTotal lines added ${
			rangeEnd - rangeStart + checkpointCounter * spacesPerChunk + additionalNullLines
		}`,
	);
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

function calculateClosestNumber(startNumber: number, dividers: number[]): number {
	let result = startNumber;

	while (!dividers.reduce((acc, el) => (result % el === 0 && acc ? true : false), true)) {
		result += 1;
	}

	return result;
}

async function init() {
	const promptNum = new CliPromptNum();
	const promptList = new CliPromptList();

	const globalThreadsKey = await promptNum.prompt({
		question: "Enter threads amount",
		defaultAnswer: 13,
	});
	const globalColumnsKey = await promptNum.prompt({
		question: "Enter columns amount",
		defaultAnswer: 14,
	});
	const globalStartKey = await promptNum.prompt({
		question: "Enter start number",
		defaultAnswer: 17000001,
	});
	const globalEndKey = await promptNum.prompt({
		question: "Enter end number",
		defaultAnswer: 20600000,
	});
	const globalLinesPerFileKey = await promptList.prompt({
		question: "Choose amount of lines per 1 file",
		choices: ["260000", "520000", "780000", "1040000"],
	});
	const globalOutputTypeKey = await promptList.prompt({
		question: "Choose output file type",
		choices: ["csv", "xlsx"],
	});

	const globalThreads = +promptNum.getValue(globalThreadsKey);
	const globalColumns = +promptNum.getValue(globalColumnsKey);
	const globalStart = +promptNum.getValue(globalStartKey);
	const globalEnd = +promptNum.getValue(globalEndKey) + 1;
	const globalLinesPerFile = +promptList.getValue(globalLinesPerFileKey);
	const globalOutputType = promptList.getValue(globalOutputTypeKey);

	console.log("\n\n##################\n\n");
	console.log(`Global range is ${globalStart} - ${globalEnd}`);
	console.log(`Will put ${globalLinesPerFile} lines to each file (except last one)`);
	console.log(
		`Page consists of ${globalThreads} threads X ${globalColumns} columns, which is ${
			globalThreads * globalColumns
		} codes per file`,
	);
	console.log("\n\n##################\n\n");

	const folderName = `tables_${globalStart}-${globalEnd}_${globalLinesPerFile}_${globalOutputType}`;
	try {
		mkdirSync(`${process.cwd()}/${folderName}`);
	} catch (e) {}

	for (
		let rangeStart = globalStart, x = 0;
		rangeStart < globalEnd;
		rangeStart += globalLinesPerFile, x++
	) {
		const rangeEndPrecalc = rangeStart + globalLinesPerFile;
		const rangeEnd = rangeEndPrecalc < globalEnd ? rangeEndPrecalc : globalEnd;

		const closestAppropriateNumber = calculateClosestNumber(rangeEnd - rangeStart, [
			globalThreads,
			globalColumns,
		]);
		const spacesPerFile = closestAppropriateNumber - (rangeEnd - rangeStart);
		const spacesPerChunk = Math.floor(spacesPerFile / 13);
		const nullLinesToAdd = spacesPerFile - spacesPerChunk * 13;
		const chunkSize = closestAppropriateNumber / 13;

		console.log(`Range ${rangeStart} - ${rangeEnd} | File ${x}`);
		console.log(
			`This file will have:\n` +
				`${closestAppropriateNumber} total lines\n` +
				`${spacesPerFile} spaces in it\n` +
				`${chunkSize} lines in 1 chunk\n` +
				`${spacesPerChunk} spaces after every chunk\n` +
				`${nullLinesToAdd} null lines in the end\n`,
		);

		const wb: WorkBook = makeBook(
			rangeStart,
			rangeEnd,
			spacesPerChunk,
			chunkSize,
			nullLinesToAdd,
		);

		console.log("Got complete workbook, saving...");

		writeFile(
			wb,
			`${process.cwd()}/${folderName}/${x + 1}_${rangeStart}-${rangeEnd}.${globalOutputType}`,
			{
				bookType: globalOutputType,
			},
		);

		console.log("Saved!");
		console.log("\n\n##################\n\n");
	}
}
init();
