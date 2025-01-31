---
title: Luanti Privacy Policy
description: Privacy policy for the Luanti application.
small: |
  Last updated: 2024-08-17
  (<a href="https://github.com/luanti-org/luanti-org.github.io/commits/master/app-privacy-policy.md">View updates</a>)
layout: page_subtitle
---

<style>
	h2 {
		margin-top: 5rem !important;
	}
</style>

Luanti may connect to the following services during its operation:

* The main website (www.luanti.org): used to get the most recent version
* The server list: used to load the server list in "Play Online"
* ContentDB: used to install/update content in the main menu
* Game servers: third-party servers when playing online

Note: this policy only applies to the Luanti application, accessing the
mentioned services directly using a web browser is not covered.

### Table of contents

- [Loading server list](#loading-server-list)
  - [Information collected](#information-collected)
  - [How it is used](#how-it-is-used)
  - [Who has access](#who-has-access)
  - [Period of retention](#period-of-retention)
  - [Location](#location)
- [ContentDB](#contentdb)
  - [Information collected](#information-collected-1)
  - [How it is used](#how-it-is-used-1)
  - [Who has access](#who-has-access-1)
  - [Period of retention](#period-of-retention-1)
  - [Location](#location-1)
  - [Removal requests](#removal-requests)
- [Version checking](#version-checking)
  - [Information collected](#information-collected-2)
  - [How it is used](#how-it-is-used-2)
- [Online play](#online-play)
- [Third parties](#third-parties)
- [Future changes to privacy policy](#future-changes-to-privacy-policy)


## Loading server list

### Information collected

When you open the Play Online tab, Luanti will request the server list.
The following information will be transferred or included:

* IP address
* Luanti version
* Platform and Operating System

### How it is used

HTTP requests are logged to aid with debugging, development and user
support. They may also be used to generate anonymized, aggregated user statistics.

### Who has access

sfan5 runs the server list and has access to the logs. Logs may be shared with
others to aid with debugging, user support, or combating abuse.

### Period of retention

Logged HTTP requests are stored for up to 3 months.

### Location

The server list is currently located in the Netherlands.


## ContentDB

You can find more information on
[ContentDB's privacy policy](https://content.luanti.org/privacy_policy/).

### Information collected

Requests to [ContentDB](https://content.luanti.org) will be made in the main
menu when using the ContentDB feature. This includes checking for updates when
you have packages from ContentDB installed. The following information will be
transferred or included:

* IP address
* Page URL
* Luanti version
* Platform and Operating System

for example:

```
11.22.33.44 content.luanti.org - [06/July/2024:10:05:00 +0200] "GET /packages/Wuzzy/glitch/releases/18414/download/?reason=new HTTP/2.0" 302 233 "-" "Luanti/5.8.0 (Windows/10.0.19041 x86_64)"
```

### How it is used

HTTP requests are logged to aid with debugging, development, and aggregated
statistics.

Requests (such as downloads) are used for aggregated statistics and for
calculating the popularity of packages. Download counts are shown for each
package and release, and there are also download graphs available for each
package.

Whether an IP address has downloaded a package or release is cached to prevent
downloads from being counted multiple times per IP address, but this information
is deleted regularly.

### Who has access

rubenwardy runs ContentDB and has access to the logs. Logs may be shared with
others to aid with debugging, user support, or combating abuse.

### Period of retention

Logged HTTP requests are automatically deleted after 14 days.
Whether an IP address has downloaded a package or release is automatically
deleted after 14 days.

### Location

ContentDB is currently located in Germany and backups are stored within the
United Kingdom and/or EU. By using this service, you give permission for the
data to be moved within the United Kingdom and/or EU.

### Removal requests

See [ContentDB's privacy policy](https://content.luanti.org/privacy_policy/#removal-requests).


## Version checking

### Information collected

When you open Luanti, it may contact www.luanti.org to fetch information
about the most recent version. The following information will be transferred or
included:

* IP address
* Luanti version
* Platform and Operating System

### How it is used

The version information is hosted on GitHub Pages.
See [About GitHub Pages > Data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection):

> When a GitHub Pages site is visited, the visitor's IP address is logged and
> stored for security purposes, regardless of whether the visitor has signed
> into GitHub or not. For more information about GitHub's security practices,
> see
> [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement).


## Online play

Luanti allows you to play online on multiplayer game servers. Please note that
game servers are third-party, Luanti acts like a web browser connecting to a
website. Therefore, please refer to the game server's privacy policy.


## Third parties

We do not share any personal information with third parties.


## Future changes to privacy policy

We will alert any future changes to the privacy policy via posts on the
Luanti forum and by the last updated date at the top of this page.
