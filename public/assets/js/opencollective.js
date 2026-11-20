// @author rubenwardy
// @license MIT
/*
@licstart

Copyright 2025 rubenwardy

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@licend  The above is the entire license notice for the JavaScript code in this
page.
*/

const graphQL = `
query Members($collectiveSlug: String!, $role: String, $limit: Int, $offset: Int, $orderBy: String) {
  allMembers(
    collectiveSlug: $collectiveSlug
    role: $role
    limit: $limit
    offset: $offset
    orderBy: $orderBy
  ) {
    stats {
      totalDonations
      __typename
    }
    member {
      type
      name
      company
      description
      slug
      website
      imageUrl
      isIncognito
      __typename
    }
    __typename
  }
}
`;

// Donors that need manual fixes, such as organisations that donated using
// guest accounts and so appear as multiple separate members.
const overrides = [
	{
		match: (member) => member.member.name.includes("Teckids"),
		member: {
			type: "ORGANIZATION",
			name: "Teckids",
			slug: "",
			website: "https://teckids.org/",
			imageUrl: "https://teckids.org/apple-touch-icon.png",
		},
	},
	{
		match: (member) => member.member.name === "FACTORFX",
		member: {
			type: "ORGANIZATION",
		},
	},
];

function applyOverrides(members) {
	const result = [];
	const merged = new Map();
	for (const member of members) {
		const override = overrides.find(o => o.match(member));
		if (!override) {
			result.push(member);
			continue;
		}

		const existing = merged.get(override);
		if (existing) {
			existing.stats.totalDonations += member.stats.totalDonations;
		} else {
			const combined = {
				...member,
				stats: { ...member.stats },
				member: { ...member.member, ...override.member },
			};
			merged.set(override, combined);
			result.push(combined);
		}
	}

	return result.sort((a, b) => b.stats.totalDonations - a.stats.totalDonations);
}

async function fetchMembers() {
	const req = await fetch("https://opencollective.com/api/graphql/v1", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: graphQL,
			operationName: "Members",
			variables: {
				"collectiveSlug": "luanti",
				"offset": 0,
				"role": "BACKER",
				"orderBy": "totalDonations",
				"limit": 100
			},
		}),
	});

	if (!req.ok) {
		throw Error("Failed to load members");
	}

	return (await req.json()).data.allMembers;
}

function addMember(member) {
	const isOrg = member.member.type === "ORGANIZATION";
	const container = document.getElementById(isOrg ? "credits-orgs" : "credits-users");
	const element = document.createElement("div");
	if (isOrg) {
		element.classList.add("mb-5");
	} else {
		element.classList.add("column");
		element.classList.add("is-one-quarter");
	}
	element.innerHTML = `
		<div class="media donate-credit">
			<div class="media-left">
				<figure class="image is-clipped is-48x48">
					<img
						src="https://bulma.io/assets/images/placeholders/96x96.png"
						alt="Profile picture"
						loading="lazy"
					/>
				</figure>
			</div>
			<div class="media-content">
				<a class="title is-4" rel="ugc">John Smith</a>
				<p class="title is-4">John Smith</p>
				<p class="subtitle is-6">€ 10</p>
			</div>
		</div>
	`;
	element.querySelector("img").setAttribute("src", member.member.imageUrl);
	const website =
		!(member.member.slug.startsWith("guest-") || member.member.slug.startsWith("incognito-"))
			? member.member.website ?? "https://opencollective.com/" + member.member.slug
			: null;
	const name = (((member.member.name == "Guest" || member.member.name == "Incognito") && !website) || member.member.name == "") ? "Anonymous" : member.member.name;
	element.querySelectorAll(".title").forEach(e => e.textContent = name);
	if (website) {
		element.querySelector("a.title").setAttribute("href", website);
		element.querySelector("p.title").remove();
	} else {
		element.querySelector("a.title").remove();
	}
	element.querySelector(".subtitle").innerHTML = "€&nbsp;" + (member.stats.totalDonations / 100).toFixed(0);
	container.appendChild(element);
}

async function load() {
	try {
		const members = await fetchMembers();
		applyOverrides(members).forEach(member => addMember(member));
		document.getElementById("credits-loading").style.display = "none";
	} catch {
		document.getElementById("credits-loading").textContent = "Failed to load";
	}
}

window.addEventListener("load", load());
