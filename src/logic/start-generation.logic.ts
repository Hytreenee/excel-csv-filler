import { WorkBook, writeFile } from "xlsx";
import { calculateClosestNumber, makeBook } from ".";
import { createOutputFolder } from "../fs";

function startGeneration({
	lang,
	globalThreads,
	globalColumns,
	globalStart,
	globalEnd,
	globalLinesPerFile,
	globalOutputType,
}) {
	const folderName = `tables_${globalStart}-${globalEnd}_${globalLinesPerFile.lines}_${globalOutputType}`;
	createOutputFolder(folderName);

	for (
		let rangeStart = globalStart, x = 0;
		rangeStart < globalEnd;
		rangeStart += globalLinesPerFile.lines, x++
	) {
		const rangeEndPrecalc = rangeStart + globalLinesPerFile.lines;
		const lastFileFlag = rangeEndPrecalc > globalEnd ? true : false;
		const rangeEnd = lastFileFlag ? globalEnd : rangeEndPrecalc;

		const closestAppropriateNumber = calculateClosestNumber(rangeEnd - rangeStart, [
			globalThreads,
			globalColumns,
			!lastFileFlag ? globalLinesPerFile.multiplier : 1,
		]);
		const spacesPerFile = closestAppropriateNumber - (rangeEnd - rangeStart);
		const spacesPerChunk = Math.floor(
			spacesPerFile / (!lastFileFlag ? globalLinesPerFile.multiplier : 1) / globalThreads,
		);
		const additionalNullLines =
			spacesPerFile -
			spacesPerChunk * globalThreads * (!lastFileFlag ? globalLinesPerFile.multiplier : 1);
		const chunkSizeCalculated =
			closestAppropriateNumber /
			globalThreads /
			(!lastFileFlag ? globalLinesPerFile.multiplier : 1);

		console.log(
			lang === "eng"
				? `Range ${rangeStart} - ${rangeEnd - 1} | File #${x + 1}`
				: `Промежуток ${rangeStart} - ${rangeEnd - 1} | Файл #${x + 1}`,
		);
		console.log(
			lang === "eng"
				? `This file will have -\n` +
						`Total text lines: ${closestAppropriateNumber}\n` +
						`Total codes: ${rangeEnd - rangeStart}\n` +
						`Spaces in it: ${spacesPerFile}\n` +
						`Codes in 1 chunk: ${chunkSizeCalculated - spacesPerChunk}\n` +
						`Chunks in a row: ${globalLinesPerFile.multiplier}\n` +
						`Chunks in a row: ${!lastFileFlag ? globalLinesPerFile.multiplier : 1}\n` +
						`Spaces before every chunk: ${spacesPerChunk}\n` +
						`Null lines in the end: ${additionalNullLines}\n`
				: `В этом файле будет - \n` +
						`Всего текстовых линий (кодов и пробелов): ${closestAppropriateNumber}\n` +
						`Всего кодов: ${rangeEnd - rangeStart}\n` +
						`Пробелов: ${spacesPerFile}\n` +
						`Кодов в 1 чанке: ${chunkSizeCalculated - spacesPerChunk}\n` +
						`Чанков в ряд: ${!lastFileFlag ? globalLinesPerFile.multiplier : 1}\n` +
						`Пробелов после каждого чанка: ${spacesPerChunk}\n` +
						`Нулевых линий в конце: ${additionalNullLines}\n`,
		);

		const wb: WorkBook = makeBook({
			lang,
			rangeStart,
			rangeEnd,
			spacesPerChunk,
			chunkSizeCalculated,
			additionalNullLines,
		});

		console.log(
			lang === "eng" ? "Got complete workbook, saving..." : "Документ создан, сохраняю...",
		);

		writeFile(
			wb,
			`${process.cwd()}/${folderName}/${x + 1}_${rangeStart}-${
				rangeEnd - 1
			}.${globalOutputType}`,
			{
				bookType: globalOutputType,
			},
		);

		console.log(lang === "eng" ? "Saved!" : "Сохранено!");
		console.log("\n\n##################\n\n");
	}

	console.log(lang === "eng" ? "DONE!" : "КОНЕЦ!");
	console.log(
		lang === "eng"
			? "You can now read the logs or close the programm."
			: "Теперь можно ознакомиться с логами или выйти из программы.",
	);
}

export { startGeneration };
