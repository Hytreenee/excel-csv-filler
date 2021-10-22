import { IPromptBase } from "../cli-prompt-base";

type IPromptEmail = Pick<IPromptBase, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPromptEmail };
