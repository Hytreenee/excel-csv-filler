import { IPromptBase } from "../cli-prompt-base";

type IPromptNum = Pick<IPromptBase, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPromptNum };
