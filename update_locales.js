import { readFileSync, readdirSync, lstatSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function normalize(value) {
	return value.trim().replaceAll(/\s{2,}/g, " ");
}

function normalizeLocale(data) {
	return Object.fromEntries(Object.entries(data).map(([key, value]) => [normalize(key), normalize(value)]));
}

function readLocale(lang) {
	const path = join(__dirname, "locales", lang, "translation.json");
	return normalizeLocale(JSON.parse(readFileSync(path)));
}

function writeLocale(lang, data) {
	const path = join(__dirname, "locales", lang, "translation.json");
	const json = JSON.stringify(data, undefined, 2);
	writeFileSync(path, json, { encoding: "utf-8" });
}

const locales = readdirSync(join(__dirname, "locales")).filter((fileName) => {
	if (fileName === "en") {
		return false;
	}
	const joinedPath = join(join(__dirname, "locales"), fileName)
	const isDirectory = lstatSync(joinedPath).isDirectory()
	return isDirectory;
});

const english = readLocale("en");
locales.forEach(lang => {
	const locale = readLocale(lang);
	Object.keys(english).filter(key => !locale[key]).forEach(key => {
		locale[key] = "";
	});
	Object.keys(locale).filter(key => !english[key]).forEach(key => {
		delete locale[key];
	});
	writeLocale(lang, locale);
});
