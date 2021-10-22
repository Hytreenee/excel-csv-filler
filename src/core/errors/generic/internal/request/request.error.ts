import { ERROR } from "../../../error.type";
import { InternalError } from "../internal.error";

class RequestError extends InternalError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Request error, failed before or during sending\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.REQUEST.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

export { RequestError };
