namespace ERROR {
	export namespace ERROR_ORIGIN {
		export namespace INTERNAL {
			export const VALUE = "INTERNAL";
			export type TYPE = "INTERNAL";
		}
		export namespace EXTERNAL {
			export const VALUE = "EXTERNAL";
			export type TYPE = "EXTERNAL";
		}
	}

	export namespace INTERNAL {
		export namespace REQUEST {
			export const VALUE = "REQUEST";
			export type TYPE = "REQUEST";
		}
		export namespace RESPONSE {
			export namespace NO_DATA {
				export const VALUE = "NO_DATA";
				export type TYPE = "NO_DATA";
			}
			export namespace NO_RESPONSE {
				export const VALUE = "NO_RESPONSE";
				export type TYPE = "NO_RESPONSE";
			}
			export namespace NO_RESULT {
				export const VALUE = "NO_RESULT";
				export type TYPE = "NO_RESULT";
			}
			export namespace BAD_STATUS {
				export const VALUE = "BAD_STATUS";
				export type TYPE = "BAD_STATUS";
			}
		}
		export namespace CLI {
			export namespace PROMPT {
				export namespace NO_ENTRY {
					export const VALUE = "NO_ENTRY";
					export type TYPE = "NO_ENTRY";
				}
				export namespace INTERNAL_MODULE {
					export const VALUE = "INTERNAL_MODULE";
					export type TYPE = "INTERNAL_MODULE";
				}
			}
			export namespace DASHBOARD {
				export const VALUE = "DASHBOARD";
				export type TYPE = "DASHBOARD";
			}
		}
		export namespace EVENTS {
			export namespace NATIVE {
				export namespace NO_EVENT_OR_KEY {
					export const VALUE = "NO_EVENT_OR_KEY";
					export type TYPE = "NO_EVENT_OR_KEY";
				}
			}
			export namespace PUBSUB {
				export namespace NO_CLIENT {
					export const VALUE = "NO_CLIENT";
					export type TYPE = "NO_CLIENT";
				}
			}
		}
	}

	export namespace EXTERNAL {}
}

type ERROR_ORIGIN = ERROR.ERROR_ORIGIN.EXTERNAL.TYPE | ERROR.ERROR_ORIGIN.INTERNAL.TYPE;
type ERROR_TYPE =
	| ERROR.INTERNAL.CLI.DASHBOARD.TYPE
	| ERROR.INTERNAL.CLI.PROMPT.NO_ENTRY.TYPE
	| ERROR.INTERNAL.CLI.PROMPT.INTERNAL_MODULE.TYPE
	| ERROR.INTERNAL.REQUEST.TYPE
	| ERROR.INTERNAL.RESPONSE.BAD_STATUS.TYPE
	| ERROR.INTERNAL.RESPONSE.NO_DATA.TYPE
	| ERROR.INTERNAL.RESPONSE.NO_RESPONSE.TYPE
	| ERROR.INTERNAL.RESPONSE.NO_RESULT.TYPE
	| ERROR.INTERNAL.EVENTS.PUBSUB.NO_CLIENT.TYPE
	| ERROR.INTERNAL.EVENTS.NATIVE.NO_EVENT_OR_KEY.TYPE;

export { ERROR, ERROR_ORIGIN, ERROR_TYPE };
