import { CliPromptBase } from "../cli-prompt-base";
import { IPromptConfirm } from "./cli-prompt-confirm.type";

class CliPromptConfirm extends CliPromptBase {
	constructor() {
		super("confirm");
	}

	//result value either true or false
	public prompt({ key, question, ...rest }: IPromptConfirm): Promise<any> {
		return super.prompt({ key, question, ...rest });
	}
}

export { CliPromptConfirm };
