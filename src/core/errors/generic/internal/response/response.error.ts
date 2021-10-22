import { ERROR } from "../../../error.type";
import { InternalError } from "../internal.error";

class ResponseError extends InternalError {
	constructor(ERROR_TYPE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Response error, resource returned bad status or message\n${ERROR_DESCRIPTION}`;

		super(ERROR_TYPE, ERROR_DESCRIPTION);
	}
}

class NoDataError extends ResponseError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No (body) in response\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.RESPONSE.NO_DATA.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

class NoResponseError extends ResponseError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No response section in response\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.RESPONSE.NO_RESPONSE.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

class NoResultError extends ResponseError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `No result field in data(body)\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.RESPONSE.NO_RESULT.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

class BadStatusError extends ResponseError {
	public ERROR_MESAGE: string;
	constructor(ERROR_MESAGE, ERROR_DESCRIPTION = "") {
		ERROR_DESCRIPTION = `Bad response status from server\n${ERROR_DESCRIPTION}`;

		super(ERROR.INTERNAL.RESPONSE.BAD_STATUS.VALUE, ERROR_DESCRIPTION);
		this.ERROR_MESAGE = ERROR_MESAGE;
	}
}

export { NoDataError, NoResponseError, NoResultError, BadStatusError };
