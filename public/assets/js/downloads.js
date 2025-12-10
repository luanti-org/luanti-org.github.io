function detectPlatform() {
	let ua = navigator.userAgent.toLowerCase();
	// not sure if crawlers run js but they should see everything
	if (/(bot|spider|crawler)\b/.exec(ua))
		return null;
	if (/\bwindows nt \d/.exec(ua))
		return "win";
	if (/\bandroid \d/.exec(ua))
		return "android";
	if (/\blinux\b/.exec(ua))
		return "linux";
	// iOS has "like Mac OS X", but not "Macintosh"
	if (/\bmacintosh\b/.exec(ua))
		return "mac";
	return null;
}

function showAllDownloads() {
	document.querySelectorAll("#dls-container [data-platform]").forEach(function (e) {
		e.classList.remove("is-hidden");
	});
	document.querySelector("#dls-container").classList.remove("is-centered");
	document.querySelector("#show-all-dls").classList.add("is-hidden");
}

(function () {
	let platform = detectPlatform();
	if (!platform)
		return;
	document.querySelectorAll("#dls-container [data-platform]").forEach(function (e) {
		if (e.getAttribute("data-platform") != platform)
			e.classList.add("is-hidden");
	});
	// only one column should remain, center it
	document.querySelector("#dls-container").classList.add("is-centered");

	document.querySelector("#show-all-dls").classList.remove("is-hidden");
	document.querySelector("#show-all-dls a").addEventListener("click", showAllDownloads);
})();
