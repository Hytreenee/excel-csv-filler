import { BookType, WorkBook, writeFile } from "xlsx";
import { makeBook } from ".";
import { logFileStats } from "./log-file-stats.logic";
import { IFileComputedData } from "./logic.type";

function startGeneration({
	lang,
	folderName,
	globalOutputType,
	filesParams,
}: {
	lang: string;
	folderName: string;
	globalOutputType: BookType;
	filesParams: IFileComputedData[];
}) {
	filesParams.forEach((fileParams, i) => {
		const { rangeStart, rangeEnd, spacesPerChunk, chunkSizeCalculated, additionalNullLines } =
			fileParams;

		console.log(
			lang === "eng"
				? `Range ${rangeStart} - ${rangeEnd - 1} | File #${i + 1}`
				: `Промежуток ${rangeStart} - ${rangeEnd - 1} | Файл #${i + 1}`,
		);

		logFileStats({
			lang,
			fileParams: fileParams,
			customHeaderRu: "В этом файле будет",
			customHeaderEng: "This file will have",
		});

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
			`${process.cwd()}/${folderName}/${i + 1}_${rangeStart}-${
				rangeEnd - 1
			}.${globalOutputType}`,
			{
				bookType: globalOutputType,
			},
		);

		console.log(lang === "eng" ? "Saved!" : "Сохранено!");
		console.log("\n\n##################\n\n");
	});

	console.log(lang === "eng" ? "DONE!" : "КОНЕЦ!");
	console.log(
		lang === "eng"
			? "You can now read the logs or close the programm."
			: "Теперь можно ознакомиться с логами или выйти из программы.",
	);
}

export { startGeneration };
