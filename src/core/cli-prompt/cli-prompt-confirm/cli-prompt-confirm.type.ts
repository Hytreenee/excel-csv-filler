import { IPromptBase } from "../cli-prompt-base";

type IPromptConfirm = Pick<IPromptBase, "key" | "question" | "rest">;

export { IPromptConfirm };
