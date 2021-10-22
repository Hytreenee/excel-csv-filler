import { Separator } from "inquirer";
import {
	CliPromptCheckbox,
	CliPromptConfirm,
	CliPromptEmail,
	CliPromptList,
	CliPromptNum,
	CliPromptPass,
	CliPromptText,
} from "../";

async function examplePromptCLI() {
	let cliText = new CliPromptText();
	let cliConfirm = new CliPromptConfirm();
	let cliNum = new CliPromptNum();
	let cliPass = new CliPromptPass();
	let cliEmail = new CliPromptEmail();
	let cliList = new CliPromptList();
	let cliCheckbox = new CliPromptCheckbox();

	await cliText.prompt({ key: "text", question: "Text prompt" });
	await cliConfirm.prompt({ key: "confirm", question: "Confirm prompt" });
	await cliNum.prompt({ key: "number", question: "Number prompt" });
	await cliPass.prompt({ key: "pass", question: "Password prompt" });
	await cliEmail.prompt({ key: "email", question: "Email prompt" });
	await cliList.prompt({
		key: "list",
		question: "List prompt",
		choices: [
			new Separator(),
			"first",
			"second",
			new Separator(" = Custom separator = "),
			"third",
			{ name: "fourth", disabled: "Unavailable now" },
		],
	});
	await cliCheckbox.prompt({
		key: "checkbox",
		question: "Checkbox prompt",
		choices: [
			new Separator(),
			"first",
			{ name: "second", checked: true },
			new Separator(" = Custom separator = "),
			"third",
			{ name: "fourth", disabled: "Unavailable now" },
		],
	});

	console.log(cliText.getValue("text"));
	console.log(cliConfirm.getValue("confirm"));
	console.log(cliNum.getValue("number"));
	console.log(cliPass.getValue("pass"));
	console.log(cliEmail.getValue("email"));
	console.log(cliList.getValue("list"));
	console.log(cliCheckbox.getValue("checkbox"));
}
examplePromptCLI;

export { examplePromptCLI };
