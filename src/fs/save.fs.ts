import { writeFileSync } from "fs";

function fsSave({
	fileName,
	globalThreads,
	globalColumns,
	globalStart,
	globalEnd,
	globalChunkSize,
}) {
	// save new default options
	writeFileSync(
		fileName,
		JSON.stringify(
			{
				globalThreads,
				globalColumns,
				globalStart,
				globalEnd,
				globalChunkSize,
			},
			null,
			4,
		),
	);
}

export { fsSave };
