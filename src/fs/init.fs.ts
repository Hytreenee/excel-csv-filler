import { statSync, writeFileSync } from "fs";

function fsInit(fileName) {
	// create file and put default values to it i fno file found
	try {
		statSync(fileName);
	} catch (e) {
		writeFileSync(
			fileName,
			JSON.stringify(
				{
					globalThreads: 13,
					globalColumns: 14,
					globalStart: 17000001,
					globalEnd: 20600000,
					globalChunkSize: 20000,
				},
				null,
				4,
			),
		);
	}
}

export { fsInit };
