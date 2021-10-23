import { CliPromptConfirm } from "../core/cli-prompt";

async function promptStartProcess(lang) {
	const promptConfirm = new CliPromptConfirm();
	const confirmContinueKey = await promptConfirm.prompt({
		question:
			lang === "eng"
				? "Wanna generate the files (Y) or begin from start (n)"
				: "Хотите начать создавать файлы (Y) или начать с начала (n)",
	});
	const confirmContinue = promptConfirm.getValue(confirmContinueKey);

	return confirmContinue;
}

export { promptStartProcess };
