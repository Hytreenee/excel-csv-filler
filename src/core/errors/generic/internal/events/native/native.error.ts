import { ERROR } from "../../../..";
import { EventsError } from "../events.error";

class NativeError extends EventsError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Native events related\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class NoEventOrKeyError extends NativeError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No such event name OR key stored\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.EVENTS.NATIVE.NO_EVENT_OR_KEY.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

export { NoEventOrKeyError };
