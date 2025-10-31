export default class Redirects {
	data() {
		return {
			permalink: "/redirects.json",
			eleventyExcludeFromCollections: true,
		};
	}

	render(eleventy) {
		const redirects = eleventy.collections.all.flatMap(page => {
			const redirect_from = page.data.redirect_from ?? [];
			const urls = Array.isArray(redirect_from) ? redirect_from : [redirect_from];
			return urls.map(url => [ url, this.absolute_url(page.url)]);
		});

		redirects.push([
			"/customize/", "https://content.luanti.org"
		]);

		return JSON.stringify(Object.fromEntries(redirects));
	}
}
