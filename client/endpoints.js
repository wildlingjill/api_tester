export let endpoints = [
	{
		name: "Gas Details",
		description: "Get details about gas level, car type etc.",
		url: "/api/gas/delivery",
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	},

	{
		name: "New delivery",
		description: "Create a new gas delivery",
		url: "/api/gas/delivery",
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: [
			{
				name: "email",
				label: "Email",
				type: "email",
				placeholder: "Email address",
				max: 24,
				min: 3,
			},
			{
				name: "name",
				label: "Full Name",
				type: "text",
				placeholder: "Name",
				required: true,
			},
			{
				name: "phone",
				label: "Cell Number",
				type: "tel",
				placeholder: "e.g. 123-4567",
				pattern: "\\d\\d\\d-\\d\\d\\d\\d",
			},
			{
				name: "date",
				label: "New delivery",
				type: "date",
			},
		]
	},

	{
		name: "Update delivery",
		description: "Update an existing gas delivery",
		url: "/api/gas/delivery",
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: [
			{
				name: "email",
				label: "Email",
				type: "email",
				placeholder: "Email address",
				max: 24,
				min: 3,
			},
			{
				name: "name",
				label: "Full Name",
				type: "text",
				placeholder: "Name",
				required: true,
			},
			{
				name: "phone",
				label: "Cell Number",
				type: "tel",
				placeholder: "e.g. 123-4567",
				pattern: "\\d\\d\\d-\\d\\d\\d\\d",
			},
			{
				name: "date",
				label: "New delivery",
				type: "date",
			},
		]
	},

	{
		name: "Cancel delivery",
		description: "Cancel an existing gas delivery",
		url: "/api/gas/delivery",
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		body: [
			{
				name: "email",
				label: "Email",
				type: "email",
				placeholder: "Email address",
				max: "24",
				min: "3",
			},
			{
				name: "name",
				label: "Full Name",
				type: "text",
				placeholder: "Name",
				required: true,
			},
			{
				name: "phone",
				label: "Cell Number",
				type: "tel",
				placeholder: "e.g. 123-4567",
				pattern: "\\d\\d\\d-\\d\\d\\d\\d",
			},
		]
	},
];
