import { CliPromptBase } from "../cli-prompt-base";
import { IPromptList } from "./cli-prompt-list.type";

class CliPromptList extends CliPromptBase {
	constructor() {
		super("list");
	}

	public prompt({ key, question, choices, ...rest }: IPromptList): Promise<any> {
		return super.prompt({ key, question, choices, ...rest });
	}
}

export { CliPromptList };
