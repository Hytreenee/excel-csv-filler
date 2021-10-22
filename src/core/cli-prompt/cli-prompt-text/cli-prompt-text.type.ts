import { IPromptBase } from "../cli-prompt-base";

type IPromptText = Pick<IPromptBase, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPromptText };
