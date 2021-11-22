import { calculateClosestNumber } from ".";

function preShowResults({
	lang,
	globalThreads,
	globalColumns,
	globalStart,
	globalEnd,
	globalLinesPerFile,
}) {
	let mostFiles: any = {};
	let lastFile: any = {};
	let filesCounter = 0;

	for (
		let rangeStart = globalStart;
		rangeStart < globalEnd;
		rangeStart += globalLinesPerFile.lines, filesCounter++
	) {
		const rangeEndPrecalc = rangeStart + globalLinesPerFile.lines;
		const lastFileFlag = rangeEndPrecalc > globalEnd ? true : false;
		const rangeEnd = rangeEndPrecalc < globalEnd ? rangeEndPrecalc : globalEnd;

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

		if (rangeEnd === globalEnd) {
			lastFile = {
				rangeStart,
				rangeEnd,
				closestAppropriateNumber,
				linesPerFile: rangeEnd - rangeStart,
				spacesPerFile,
				chunkSizeCalculated,
				spacesPerChunk,
				additionalNullLines,
			};
		} else {
			mostFiles = {
				rangeStart,
				rangeEnd,
				closestAppropriateNumber,
				linesPerFile: rangeEnd - rangeStart,
				spacesPerFile,
				chunkSizeCalculated,
				spacesPerChunk,
				additionalNullLines,
			};
		}
	}

	console.log("\n##################\n");
	console.log(
		lang === "eng"
			? `Files will be created: ${filesCounter}`
			: `Файлов будет создано: ${filesCounter}`,
	);
	console.log("\n##################\n");
	console.log(
		lang === "eng"
			? `Most of files will have these params -\n` +
					`Total text lines: ${mostFiles.closestAppropriateNumber}\n` +
					`Total codes: ${mostFiles.linesPerFile}\n` +
					`Spaces in it: ${mostFiles.spacesPerFile}\n` +
					`Codes in 1 chunk: ${
						mostFiles.chunkSizeCalculated - mostFiles.spacesPerChunk
					}\n` +
					`Chunks in a row: ${globalLinesPerFile.multiplier}\n` +
					`Spaces before every chunk: ${mostFiles.spacesPerChunk}\n` +
					`Null lines in the end: ${mostFiles.additionalNullLines}\n`
			: `Большинство файлов будут иметь такие данные -\n` +
					`Всего текстовых линий (кодов и пробелов): ${mostFiles.closestAppropriateNumber}\n` +
					`Всего кодов: ${mostFiles.linesPerFile}\n` +
					`Пробелов: ${mostFiles.spacesPerFile}\n` +
					`Кодов в 1 чанке: ${
						mostFiles.chunkSizeCalculated - mostFiles.spacesPerChunk
					}\n` +
					`Чанков в ряд: ${globalLinesPerFile.multiplier}\n` +
					`Пробелов перед каждым чанком: ${mostFiles.spacesPerChunk}\n` +
					`Нулевых линий в конце: ${mostFiles.additionalNullLines}\n`,
	);
	console.log("\n##################\n");

	console.log(
		lang === "eng"
			? `Last file will have these params -\n` +
					`Total text lines: ${lastFile.closestAppropriateNumber}\n` +
					`Total codes: ${lastFile.linesPerFile}\n` +
					`Spaces in it: ${lastFile.spacesPerFile}\n` +
					`Codes in 1 chunk: ${
						lastFile.chunkSizeCalculated - lastFile.spacesPerChunk
					}\n` +
					`Chunks in a row: ${1}\n` +
					`Spaces before every chunk: ${lastFile.spacesPerChunk}\n` +
					`Null lines in the end: ${lastFile.additionalNullLines}\n`
			: `Последний файл будет иметь такие данные -\n` +
					`Всего текстовых линий (кодов и пробелов): ${lastFile.closestAppropriateNumber}\n` +
					`Всего кодов: ${lastFile.linesPerFile}\n` +
					`Пробелов: ${lastFile.spacesPerFile}\n` +
					`Кодов в 1 чанке: ${lastFile.chunkSizeCalculated - lastFile.spacesPerChunk}\n` +
					`Чанков в ряд: ${1}\n` +
					`Пробелов перед каждым чанком: ${lastFile.spacesPerChunk}\n` +
					`Нулевых линий в конце: ${lastFile.additionalNullLines}\n`,
	);

	console.log("\n##################\n");
}

export { preShowResults };
