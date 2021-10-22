import { ERROR } from "../../error.type";
import { GenericError } from "../generic.error";

class InternalError extends GenericError {
	public ERROR_ORIGIN: ERROR.ERROR_ORIGIN.INTERNAL.TYPE;

	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Error happened on server side, no user input took part\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
		this.ERROR_ORIGIN = ERROR.ERROR_ORIGIN.INTERNAL.VALUE;
	}
}

export { InternalError };
