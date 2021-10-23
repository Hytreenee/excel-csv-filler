import { makeNChars } from ".";

function fixLength(num, targetLength) {
	const str = "" + num;
	const fixedStr = makeNChars(targetLength - str.length, "0") + str;

	return fixedStr;
}

export { fixLength };
