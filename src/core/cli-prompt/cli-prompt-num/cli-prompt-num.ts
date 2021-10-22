import { CliPromptBase } from "../cli-prompt-base";
import { IPromptNum } from "./cli-prompt-num.type";

class CliPromptNum extends CliPromptBase {
	constructor() {
		super("number");
	}

	//if not number entered - value empty string
	private validate(value) {
		if (isNaN(parseFloat(value)) || !isFinite(value)) return "Enter correct number (12.345)";
		return true;
	}

	public prompt({ key, question, defaultAnswer, validate, ...rest }: IPromptNum): Promise<any> {
		return super.prompt({
			key,
			question,
			defaultAnswer,
			validate: validate || this.validate,
			...rest,
		});
	}
}

export { CliPromptNum };
