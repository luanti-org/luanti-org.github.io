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
query Members($collectiveSlug: String!, $role: String, $type: String, $limit: Int, $offset: Int, $orderBy: String) {
  allMembers(
    collectiveSlug: $collectiveSlug
    role: $role
    type: $type
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
				"type": "USER",
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
	const container = document.getElementById("credits-container");
	const element = document.createElement("div");
	element.classList.add("column");
	element.classList.add("is-one-quarter");
	element.innerHTML = `
		<div class="media">
			<div class="media-left">
				<figure class="image is-48x48">
				<img
					src="https://bulma.io/assets/images/placeholders/96x96.png"
					alt="Profile picture"
					loading="lazy"
				/>
				</figure>
			</div>
			<div class="media-content">
				<a class="title is-4" rel="ugc">John Smith</a>
				<p class="subtitle is-6">€ 10</p>
			</div>
		</div>
	`;
	const website = member.member.website ?? "https://opencollective.com/" + member.member.slug;
	element.querySelector("img").setAttribute("src", member.member.imageUrl);
	element.querySelector(".title").textContent = member.member.name;
	element.querySelector(".title").setAttribute("href", website);
	element.querySelector(".subtitle").innerHTML = "€&nbsp;" + (member.stats.totalDonations / 100).toFixed(0);
	container.appendChild(element);
}

async function load() {
	try {
		const members = await fetchMembers();
		members.forEach(member => addMember(member));
		document.getElementById("credits-loading").style.display = "none";
	} catch {
		document.getElementById("credits-loading").textContent = "Failed to load";
	}
}

document.getElementById("noscript").style.display = "none";
document.getElementById("credits-loading").style.display = "block";

window.addEventListener("load", load());
