import { createOutputFolder, fsInit, fsSave } from "./fs";
import { clearCli } from "./helpers/util";
import { preShowResults, startGeneration } from "./logic";
import { computeFilesParams } from "./logic/compute-files-params.logic";
import { promptChooseLang, promptInitValues, promptStartProcess } from "./prompts";

setInterval(() => {
	// for keep working
}, 1000);

async function main(lang, fileName) {
	const {
		globalThreads,
		globalColumns,
		globalStart,
		globalEnd,
		globalLinesPerFile,
		globalOutputType,
		globalChunkSize,
	} = await promptInitValues(lang);

	fsSave({
		fileName,
		globalThreads,
		globalColumns,
		globalStart,
		globalEnd: globalEnd - 1,
		globalChunkSize,
	});

	const filesParams = computeFilesParams({
		globalThreads,
		globalColumns,
		globalStart,
		globalEnd,
		globalLinesPerFile,
		globalChunkSize,
	});

	preShowResults({
		lang,
		filesParams,
	});

	const confirmContinue = await promptStartProcess(lang);

	clearCli();

	if (confirmContinue) {
		const folderName = `tables_${globalStart}-${globalEnd}_${globalLinesPerFile.lines}_${globalOutputType}`;
		createOutputFolder(folderName);

		startGeneration({
			lang,
			folderName,
			globalOutputType,
			filesParams,
		});
	} else {
		main(lang, fileName);
	}
}

async function init() {
	const fileName = "options.json";
	fsInit(fileName);

	const lang = await promptChooseLang();
	main(lang, fileName);
}
init();
