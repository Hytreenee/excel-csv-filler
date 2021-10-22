import { CliPromptBase } from "../cli-prompt-base";
import { IPromptText } from "./cli-prompt-text.type";

class CliPromptText extends CliPromptBase {
	constructor() {
		super("input");
	}

	public prompt({ key, question, defaultAnswer, validate, ...rest }: IPromptText): Promise<any> {
		return super.prompt({ key, question, defaultAnswer, validate: validate, ...rest });
	}
}

export { CliPromptText };
