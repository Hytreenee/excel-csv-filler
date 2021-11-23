import { calculateClosestNumber } from ".";
import { IFileComputedData } from "./logic.type";

function computeFilesParams({
	globalThreads,
	globalColumns,
	globalStart,
	globalEnd,
	globalLinesPerFile,
	globalChunkSize,
}) {
	const filesComputedData: IFileComputedData[] = [];
	let step = globalLinesPerFile.lines;

	for (let rangeStart = globalStart; rangeStart < globalEnd; rangeStart += step) {
		const { rangeEnd } = rangeCalc({
			rangeStart,
			globalLinesPerFile,
			globalEnd,
		});
		let isLastFile = false;
		let codesPerFile = rangeEnd - rangeStart;
		let multiplier = globalLinesPerFile.multiplier;

		for (let i = globalLinesPerFile.multiplier; i >= 0; i--) {
			// this is last file, because even multiplier 1 was not enough
			// so codesPerFile is less than bare minimum (globalChunkSize * globalThreads)
			if (i === 0) {
				isLastFile = true;
				multiplier = 1;
				break;
			}

			const codesPerFileWithCurrentMultiplier = globalChunkSize * globalThreads * i;

			// file is fully satisfies multiplier
			if (codesPerFile === codesPerFileWithCurrentMultiplier) {
				break;
			}

			// we found multiplier, that is less than default and greater than 1 (globalChunkSize * globalThreads);
			// amount of lines with this multiplier is less than current calculated amount,
			// so we extract it from current number, reassign multiplier and continue calculating
			// also changing next start position by reassigning step
			if (codesPerFile > codesPerFileWithCurrentMultiplier) {
				const approptiateCodesPerFile = codesPerFileWithCurrentMultiplier;
				step = approptiateCodesPerFile;
				codesPerFile = approptiateCodesPerFile;
				multiplier = i;

				break;
			}
		}

		const {
			spacesPerChunk,
			chunkSizeCalculated,
			additionalNullLines,
			closestAppropriateNumber,
			spacesPerFile,
		} = parametersCalc({
			codesPerFile,
			globalThreads,
			globalColumns,
			isLastFile,
			multiplier,
			globalChunkSize,
		});

		filesComputedData.push({
			spacesPerChunk,
			chunkSizeCalculated,
			additionalNullLines,
			closestAppropriateNumber,
			spacesPerFile,
			rangeStart,
			rangeEnd,
			codesPerFile,
			multiplier,
		});
	}
	return filesComputedData;
}

function rangeCalc({ rangeStart, globalLinesPerFile, globalEnd }) {
	const rangeEndPrecalc = rangeStart + globalLinesPerFile.lines;
	const rangeEnd = rangeEndPrecalc > globalEnd ? globalEnd : rangeEndPrecalc;

	return { rangeEnd };
}

function parametersCalc({
	codesPerFile,
	globalThreads,
	globalColumns,
	isLastFile,
	multiplier,
	globalChunkSize,
}) {
	const closestAppropriateNumber = calculateClosestNumber(codesPerFile, [
		globalThreads,
		globalColumns,
		multiplier,
	]);
	const spacesPerFile = closestAppropriateNumber - codesPerFile;
	const spacesPerChunk = Math.floor(spacesPerFile / multiplier / globalThreads);
	const additionalNullLines = spacesPerFile - spacesPerChunk * globalThreads * multiplier;

	// i honeslty have no clue why final value even has extra spacesPerChunk in it, but subtracting it worked out, finally...
	const chunkSizeCalculated = isLastFile
		? closestAppropriateNumber / globalThreads / multiplier - spacesPerChunk
		: globalChunkSize;

	return {
		spacesPerChunk,
		chunkSizeCalculated,
		additionalNullLines,
		closestAppropriateNumber,
		spacesPerFile,
	};
}

export { computeFilesParams };
