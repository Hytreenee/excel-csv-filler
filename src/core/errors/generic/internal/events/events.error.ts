import { InternalError } from "..";

class EventsError extends InternalError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Events related\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

export { EventsError };
