import { logFileStats } from "./log-file-stats.logic";
import { IFileComputedData } from "./logic.type";

function preShowResults({ lang, filesParams }: { lang: string; filesParams: IFileComputedData[] }) {
	console.log("\n##################\n");
	console.log(
		lang === "eng"
			? `Files will be created: ${filesParams.length}`
			: `Файлов будет создано: ${filesParams.length}`,
	);
	console.log("\n##################\n");

	const averageFile = filesParams[0];
	const penultimateFile = filesParams[filesParams.length - 2];
	const lastFile = filesParams[filesParams.length - 1];

	logFileStats({
		lang,
		fileParams: averageFile,
		customHeaderRu: "Большинство файлов будут иметь такие данные",
		customHeaderEng: "Most of files will have these params",
	});

	console.log("\n##################\n");

	logFileStats({
		lang,
		fileParams: penultimateFile,
		customHeaderRu: "Предпоследний файл будут иметь такие данные",
		customHeaderEng: "Penultimate file will have these params",
	});

	console.log("\n##################\n");

	logFileStats({
		lang,
		fileParams: lastFile,
		customHeaderRu: "Последний файл будет иметь такие данные",
		customHeaderEng: "Last file will have these params",
	});

	console.log("\n##################\n");
}

export { preShowResults };
