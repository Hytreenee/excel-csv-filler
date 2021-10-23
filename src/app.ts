import { mkdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { writeFile, utils, WorkBook } from "xlsx";
import { CliPromptList, CliPromptNum } from "./core/cli-prompt";

setInterval(() => {
	// for keep working
}, 1000);

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

function calculateClosestNumber(
	startNumber: number,
	dividers: number[],
	minDiffWithStart: number,
): number {
	let result = startNumber;

	while (true) {
		let appropriate = true;

		for (let divider of dividers) {
			if (result % divider !== 0) {
				appropriate = false;
			}

			// custom check
			if (result - startNumber < minDiffWithStart) {
				appropriate = false;
			}
		}

		if (appropriate) {
			break;
		}

		result += 1;
	}

	return result;
}

async function prompts() {
	const promptNum = new CliPromptNum();
	const promptList = new CliPromptList();

	// create file and put default values to it i fno file found
	try {
		statSync("./options.json");
	} catch (e) {
		writeFileSync(
			"./options.json",
			JSON.stringify(
				{
					globalThreads: 13,
					globalColumns: 14,
					globalStart: 17000001,
					globalEnd: 20600000,
					globalChunkSize: 20000,
				},
				null,
				4,
			),
		);
	}

	const parsedOptions: { globalThreads; globalColumns; globalStart; globalEnd; globalChunkSize } =
		JSON.parse(readFileSync("./options.json", "utf-8"));

	const globalThreadsKey = await promptNum.prompt({
		question: "Enter threads amount\n" + "Кол-во потоков",
		defaultAnswer: parsedOptions.globalThreads,
	});
	const globalColumnsKey = await promptNum.prompt({
		question: "Enter columns amount\n" + "Кол-во колонок",
		defaultAnswer: parsedOptions.globalColumns,
	});
	const globalStartKey = await promptNum.prompt({
		question: "Enter start number\n" + "Стартовый номер",
		defaultAnswer: parsedOptions.globalStart,
	});
	const globalEndKey = await promptNum.prompt({
		question: "Enter end number\n" + "Конечный номер",
		defaultAnswer: parsedOptions.globalEnd,
	});
	const globalChunkSizeKey = await promptNum.prompt({
		question:
			"Enter amount of lines per 1 thread (chunk)\n" +
			"Сколько кодов просит заказчик в 1 рулоне (*чанк)",
		defaultAnswer: parsedOptions.globalChunkSize,
	});
	const minSpacesAmountKey = await promptList.prompt({
		question:
			"Choose minimal amount of spaces after each chunk\n" +
			"Минимальное кол-во пробелов после *чанка ",
		choices: ["2", "3", "4", "5", "6"],
	});

	const globalThreads = +promptNum.getValue(globalThreadsKey);
	const globalChunkSize = +promptNum.getValue(globalChunkSizeKey);

	const linesPerFileChoices: Array<string> = [];
	for (let i = 1; i < 20; i++) {
		linesPerFileChoices.push((globalThreads * i * globalChunkSize).toString());
	}
	const globalLinesPerFileKey = await promptList.prompt({
		question:
			"Choose amount of lines per 1 file (based on threads X chunk size)\n" +
			"Выбери общее кол-во линий в 1 файле. Расчитано на основе (потоки * чанк * множитель)",
		choices: linesPerFileChoices,
	});
	const globalOutputTypeKey = await promptList.prompt({
		question: "Choose output file type\n" + "Тип выходного файла",
		choices: ["csv", "xlsx"],
	});

	const globalColumns = +promptNum.getValue(globalColumnsKey);
	const globalStart = +promptNum.getValue(globalStartKey);
	const globalEnd = +promptNum.getValue(globalEndKey) + 1;
	const globalLinesPerFile = +promptList.getValue(globalLinesPerFileKey);
	const globalOutputType = promptList.getValue(globalOutputTypeKey);
	const minSpacesAmount = +promptList.getValue(minSpacesAmountKey);

	// save new default options
	writeFileSync(
		"./options.json",
		JSON.stringify(
			{
				globalThreads,
				globalColumns,
				globalStart,
				globalEnd,
				globalChunkSize,
			},
			null,
			4,
		),
	);

	return {
		globalThreads,
		globalColumns,
		globalStart,
		globalEnd,
		globalLinesPerFile,
		globalOutputType,
		minSpacesAmount,
	};
}

async function init() {
	const {
		globalThreads,
		globalColumns,
		globalStart,
		globalEnd,
		globalLinesPerFile,
		globalOutputType,
		minSpacesAmount,
	} = await prompts();

	console.log("\n\n##################\n\n");
	console.log(`Global range is ${globalStart} - ${globalEnd}`);
	console.log(`Will put ${globalLinesPerFile} lines to each file (except last one)`);
	console.log(
		`Page consists of ${globalThreads} threads X ${globalColumns} columns, which is ${
			globalThreads * globalColumns
		} codes per raport`,
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

		const closestAppropriateNumber = calculateClosestNumber(
			rangeEnd - rangeStart,
			[globalThreads, globalColumns],
			minSpacesAmount,
		);
		const spacesPerFile = closestAppropriateNumber - (rangeEnd - rangeStart);
		const spacesPerChunk = Math.floor(spacesPerFile / globalThreads);
		const nullLinesToAdd = spacesPerFile - spacesPerChunk * globalThreads;
		const chunkSize = closestAppropriateNumber / globalThreads;

		console.log(`Range ${rangeStart} - ${rangeEnd} | File ${x + 1}`);
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

	console.log("DONE!");
	console.log("You can now read the logs or close the programm.");
}
init();
