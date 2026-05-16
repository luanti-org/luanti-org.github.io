import EleventyFetch from "@11ty/eleventy-fetch";

const graphQL = `
query GetCollectiveGoals($collectiveSlug: String!) {
	collective(slug: $collectiveSlug) {
		currency
		settings
		stats {
			balance {
				value
				currency
			}
			yearlyBudget {
				value
				currency
			}
		}
	}
}
`;

export default async function () {
	// Get goals for collective
	const req = await fetch("https://opencollective.com/api/graphql/v2", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: graphQL,
			operationName: "GetCollectiveGoals",
			variables: {
				"collectiveSlug": "luanti",
			},
		}),
	});

	if (!req.ok) {
		console.error(await req.text());
		throw Error("Failed to load Open Collective goals");
	}

	const data = (await req.json()).data;
	let monthlyBudget = data.collective.stats.yearlyBudget.value / 12;
	let balance = data.collective.stats.balance.value;
	return data.collective.settings.goals.map(goal => {
		const value = Math.min(goal.type === "monthlyBudget" ? monthlyBudget : balance, goal.amount / 100);
		if (goal.type === "monthlyBudget") {
			monthlyBudget -= value;
		} else {
			balance -= value;
		}
		return {
			id: goal.key,
			title: goal.title,
			value: Math.round(value),
			target: Math.round(goal.amount / 100),
			suffix: goal.type === "monthlyBudget" ? "per month" : "raised",
		};
	});
}
