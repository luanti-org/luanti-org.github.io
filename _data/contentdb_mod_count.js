import EleventyFetch from "@11ty/eleventy-fetch";

const API = "https://content.luanti.org/api/packages/?type=mod";
const CACHE = process.env.CONTENTDB_CACHE || "6h";

export default async function () {
	try {
		const data = await EleventyFetch(API, { duration: CACHE, type: "json", fetchOptions: { headers: { Accept: "application/json" } } });
		const count = data.length;
		return Math.floor(count / 100) * 100;
	} catch (err) {
		console.error("contentdb_mod_count fetch failed:", err && err.message ? err.message : err);
		return null;
	}
}
