import { ERROR } from "../../../..";
import { EventsError } from "../events.error";

class PubSubError extends EventsError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `PubSub related\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class NoClassInstanceError extends PubSubError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Quit operation was probably executed before\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.EVENTS.PUBSUB.NO_CLIENT.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

export { NoClassInstanceError, PubSubError };
