import { ERROR } from "../../../error.type";
import { InternalError } from "../internal.error";

class CliError extends InternalError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Cli error\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class CliPromptError extends CliError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Prompt error\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class CliDashboardError extends CliError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Dashboard error\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class CliNoEntryError extends CliPromptError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE = "", ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No entry found by key provided\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.CLI.PROMPT.NO_ENTRY.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

class CliInternalModuleError extends CliPromptError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE = "", ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Internal inquirer error\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.CLI.PROMPT.INTERNAL_MODULE.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

export { CliError, CliPromptError, CliDashboardError, CliNoEntryError, CliInternalModuleError };
