import { fsInit, fsSave } from "./fs";
import { clearCli } from "./helpers/util";
import { preShowResults, startGeneration } from "./logic";
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

	preShowResults({
		lang,
		globalThreads,
		globalColumns,
		globalStart,
		globalEnd,
		globalLinesPerFile,
	});

	const confirmContinue = await promptStartProcess(lang);

	clearCli();

	if (confirmContinue) {
		startGeneration({
			lang,
			globalThreads,
			globalColumns,
			globalStart,
			globalEnd,
			globalLinesPerFile,
			globalOutputType,
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
