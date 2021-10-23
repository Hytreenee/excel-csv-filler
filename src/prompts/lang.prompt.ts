import { CliPromptList } from "../core/cli-prompt";

async function promptChooseLang() {
	const promptList = new CliPromptList();
	const langKey = await promptList.prompt({
		question: "Select language",
		choices: ["ru", "eng"],
	});
	const lang = promptList.getValue(langKey);

	return lang;
}

export { promptChooseLang };
