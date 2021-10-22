import { ERROR_ORIGIN, ERROR_TYPE } from "../error.type";

class GenericError extends Error {
	public ERROR_DESCRIPTION: string;
	public ERROR_TIMESTAMP: number;
	public ERROR_TIMESTAMP_HR: Date;
	public ERROR_MESAGE?: string;
	public ERROR_ORIGIN?: ERROR_ORIGIN;

	constructor(ERROR_TYPE: ERROR_TYPE, ERROR_DESCRIPTION) {
		super(ERROR_TYPE);

		this.ERROR_DESCRIPTION = `General error level\n${ERROR_DESCRIPTION}`;
		this.ERROR_TIMESTAMP_HR = new Date();
		this.ERROR_TIMESTAMP = this.ERROR_TIMESTAMP_HR.getTime();
	}
}

export { GenericError };
