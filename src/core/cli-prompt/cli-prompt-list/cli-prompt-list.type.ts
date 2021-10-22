import { IPromptBase } from "../cli-prompt-base";

type IPromptList = Pick<IPromptBase, "key" | "question" | "choices" | "rest">;

export { IPromptList };
