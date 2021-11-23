import { readFileSync } from "fs";
import { BookType } from "xlsx";
import { CliPromptList, CliPromptNum } from "../core/cli-prompt";

async function promptInitValues(lang) {
	const promptNum = new CliPromptNum();
	const promptList = new CliPromptList();

	const parsedOptions: { globalThreads; globalColumns; globalStart; globalEnd; globalChunkSize } =
		JSON.parse(readFileSync("./options.json", "utf-8"));

	const globalThreadsKey = await promptNum.prompt({
		question: lang === "eng" ? "Enter threads amount" : "Кол-во ручьев",
		defaultAnswer: parsedOptions.globalThreads,
	});
	const globalColumnsKey = await promptNum.prompt({
		question: lang === "eng" ? "Enter columns amount" : "Кол-во столбцов",
		defaultAnswer: parsedOptions.globalColumns,
	});
	const globalStartKey = await promptNum.prompt({
		question: lang === "eng" ? "Enter start number" : "Стартовый номер",
		defaultAnswer: parsedOptions.globalStart,
	});
	const globalEndKey = await promptNum.prompt({
		question: lang === "eng" ? "Enter end number" : "Конечный номер",
		defaultAnswer: parsedOptions.globalEnd,
	});
	const globalChunkSizeKey = await promptNum.prompt({
		question:
			lang === "eng"
				? "Enter amount of lines per 1 thread (chunk)"
				: "Сколько кодов просит заказчик в 1 ролике (*чанк)",
		defaultAnswer: parsedOptions.globalChunkSize,
	});

	const globalThreads = +promptNum.getValue(globalThreadsKey);
	const globalChunkSize = +promptNum.getValue(globalChunkSizeKey);

	const linesPerFileChoices: Array<any> = [];
	for (let i = 1; i < 20; i++) {
		linesPerFileChoices.push({
			name: globalThreads * i * globalChunkSize,
			value: { lines: globalThreads * i * globalChunkSize, multiplier: i },
		});
	}
	const globalLinesPerFileKey = await promptList.prompt({
		question:
			lang === "eng"
				? "Choose amount of lines per 1 file (based on threads X chunk size)"
				: "Выбери общее кол-во кодов в 1 файле. Расчитано на основе (ручьи * чанк * множитель)",
		choices: linesPerFileChoices,
	});
	const globalOutputTypeKey = await promptList.prompt({
		question: lang === "eng" ? "Choose output file type" : "Тип выходного файла",
		choices: ["csv", "txt", "xlsx"],
	});

	const globalColumns = +promptNum.getValue(globalColumnsKey);
	const globalStart = +promptNum.getValue(globalStartKey);
	const globalEnd = +promptNum.getValue(globalEndKey) + 1;
	const globalLinesPerFile: { lines; multiplier } = promptList.getValue(globalLinesPerFileKey);
	const globalOutputType = <BookType>promptList.getValue(globalOutputTypeKey);

	return {
		globalThreads,
		globalColumns,
		globalStart,
		globalEnd,
		globalLinesPerFile,
		globalOutputType,
		globalChunkSize,
	};
}

export { promptInitValues };
