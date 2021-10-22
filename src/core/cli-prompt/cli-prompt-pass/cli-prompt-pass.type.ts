import { IPromptBase } from "../cli-prompt-base";

type IPromptPass = Pick<IPromptBase, "key" | "question" | "defaultAnswer" | "validate" | "rest">;

export { IPromptPass };
