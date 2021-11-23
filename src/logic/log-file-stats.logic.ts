import { IFileComputedData } from "./logic.type";

function logFileStats({
	lang,
	fileParams,
	customHeaderRu,
	customHeaderEng,
}: {
	lang: string;
	fileParams: IFileComputedData;
	customHeaderRu: string;
	customHeaderEng: string;
}): void {
	console.log(
		lang === "eng"
			? `${customHeaderEng}\n` +
					`Total text lines: ${fileParams.closestAppropriateNumber}\n` +
					`Total codes: ${fileParams.codesPerFile}\n` +
					`Spaces in it: ${fileParams.spacesPerFile}\n` +
					`Codes in 1 chunk: ${fileParams.chunkSizeCalculated}\n` +
					`Chunks in a row: ${fileParams.multiplier}\n` +
					`Spaces before every chunk: ${fileParams.spacesPerChunk}\n` +
					`Null lines in the end: ${fileParams.additionalNullLines}\n`
			: `${customHeaderRu}\n` +
					`Всего текстовых линий (кодов и пробелов): ${fileParams.closestAppropriateNumber}\n` +
					`Всего кодов: ${fileParams.codesPerFile}\n` +
					`Пробелов: ${fileParams.spacesPerFile}\n` +
					`Кодов в 1 чанке: ${fileParams.chunkSizeCalculated}\n` +
					`Чанков в ряд: ${fileParams.multiplier}\n` +
					`Пробелов перед каждым чанком: ${fileParams.spacesPerChunk}\n` +
					`Нулевых линий в конце: ${fileParams.additionalNullLines}\n`,
	);
}

export { logFileStats };
