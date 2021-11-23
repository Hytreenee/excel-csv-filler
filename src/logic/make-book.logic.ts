import { utils, WorkBook } from "xlsx";
import { fixLength } from "../helpers/util";

function makeBook({
	lang,
	rangeStart,
	rangeEnd,
	spacesPerChunk,
	chunkSizeCalculated,
	additionalNullLines,
}) {
	const wb: WorkBook = utils.book_new();
	const wsData: Array<Array<string>> = [];

	// instead of manually adding later on
	wsData.push(["name1"]);

	let chunkSizeCheckpoint = rangeStart;
	let checkpointCounter = 0;

	for (let i = rangeStart; i < rangeEnd; i++) {
		if (chunkSizeCheckpoint === i) {
			console.log(
				lang === "eng"
					? `Reached spaces checkpoint #${++checkpointCounter}`
					: `Дошел до точки проставления пробелов #${++checkpointCounter}`,
			);
			chunkSizeCheckpoint += chunkSizeCalculated;
			for (let i = 0; i < spacesPerChunk; i++) {
				wsData.push([""]);
			}
		}
		const fixedStr = fixLength("" + i, 8);
		wsData.push([fixedStr]);
	}

	if (additionalNullLines) {
		console.log(
			lang === "eng"
				? `Adding ${additionalNullLines} null lines to the end - fix`
				: `Добавляю ${additionalNullLines} нулевых линий в конец - fix`,
		);
		for (let i = 0; i < additionalNullLines; i++) {
			wsData.push(["00000000"]);
		}
	}

	console.log(
		lang === "eng"
			? `\nTotal lines added ${
					rangeEnd - rangeStart + checkpointCounter * spacesPerChunk + additionalNullLines
			  }`
			: `\nВсего линий добавлено ${
					rangeEnd - rangeStart + checkpointCounter * spacesPerChunk + additionalNullLines
			  }`,
	);
	console.log(lang === "eng" ? "Writing to sheet..." : `Добавляю данные на страницу...`);

	const ws = utils.aoa_to_sheet(Array.from(wsData));
	console.log(lang === "eng" ? "Added all codes to sheet" : "Добавил все данные на страницу");

	utils.book_append_sheet(wb, ws, "Sheet");
	console.log(lang === "eng" ? "Appended sheet" : "Прикрепил страницу");

	return wb;
}

export { makeBook };
