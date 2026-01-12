# [Luanti Website](https://www.luanti.org)

[![Build status](https://github.com/luanti-org/luanti-org.github.io/workflows/build/badge.svg)](https://github.com/luanti-org/luanti-org.github.io/actions)
[![Translation status](https://hosted.weblate.org/widget/minetest/website/svg-badge.svg)](https://hosted.weblate.org/engage/minetest/)

The official Luanti website, living at [www.luanti.org](https://www.luanti.org).

## Features

- Uses the [Bulma](https://bulma.io/) CSS framework.
- Uses modern Web design techniques: `rem` units, `hsl` colors.
- Responsive site and favicon.
- Translation support using [i18next](https://www.i18next.com/).

## Development workflow

This site uses the [Eleventy](https://www.11ty.dev/) static site generator.

- Ensure you have [Node](https://nodejs.org/en) 24 or later installed.
  - We recommend using `nvm`. First install nvm,
    and then run `nvm use` whenever you open the project.
- Run `npm install`.
- Run `npm start` to serve the website locally.

### Browser support

When working on new features, keep in mind this website only supports
*evergreen browsers*:

- Chrome (two most recent versions)
- Edge (two most recent versions)
- Firefox (two most recent versions + latest ESR version)
- Opera (two most recent versions)
- Safari (two most recent versions)

Internet Explorer isn't supported.

## Translation

### For translators

Translate using Weblate: https://hosted.weblate.org/projects/minetest/website/

### Enabling languages

When a language is reasonably complete, you can enable it like so:

* Copy `content/fr` to `content/LANG_CODE` where LANG_CODE is your language code.
* Rename `content/LANG_CODE/fr.json` to `content/LANG_CODE/LANG_CODE.json`.
* Edit `content/LANG_CODE/LANG_CODE.json` to have `"lang": "LANG_CODE"`.
* Create a PR for your updates (or ask a maintainer to directly do this).

### For developers

Luanti.org uses [i18next](https://www.i18next.com/) for translations. This is
exposed to liquid templates by a custom i18n filter:

```liquid
{{ "Hello world" | i18n }}
```

As double curly braces are used by liquid, use double square braces instead:

```liquid
{{ "Hello [[name]]" | i18n: "name", "Bob" }}
```

When Eleventy builds the website, it'll update the `locales/en/translation.json`
file with any new strings it finds. It'll replace `[[name]]` with `{{name}}` to
match i18next's interpolation syntax:

```json
{
	"Hello {{name}}": "Bonjour {{name}}"
}
```

### Updating translations

* Stop the site if it is running locally.
* Edit `locales/en/translation.json` to `{}` and save.
* Run `npm start`.
* Commit changes to `locales`.

## Brand icons

- [Discord](https://discord.com/branding)
- [Mastodon](https://joinmastodon.org/branding)
- [Reddit](https://redditbrand.lingoapp.com/s/d9x3n2?v=40)

## License

Copyright © 2015-2025 Hugo Locurcio, rubenwardy, and contributors

Unless otherwise specified, code is licensed under the MIT license.
Media (except gallery) and content are licensed under
[CC BY-SA 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/).

Gallery screenshots are by various authors and are credited on the webpage.
