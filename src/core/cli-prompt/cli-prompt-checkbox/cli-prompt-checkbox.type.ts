import { IPromptBase } from "../cli-prompt-base";

type IPromptCheckbox = Pick<IPromptBase, "key" | "question" | "choices" | "validate" | "rest">;

export { IPromptCheckbox };
