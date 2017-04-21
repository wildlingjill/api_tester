import React from "react";

// Sorry about the length of this component! Ideally would split it up further
// Api component renders the info for each api call
export class Api extends React.Component {

	// constructor called to set the state
	constructor () {
		// super calls constructor method on base class (react component)
		super();
		// creating the state object with the formData key in it, initially set to an empty object
		this.state = { formData: {} };
	}

	// onBlur used as onChange registered a change on every key press, rather than just at the end of user input in the form field
	onBlur (event) {
		// sets the formData key as equal to the existing formData value, plus creates keys for any new info taken from the form by setting event.target.name = event.target.value
		this.setState({formData: { ...this.state.formData, [event.target.name]: event.target.value} });
		// run a validity check on the data for validation before submission, e.g. is it a required field, does it contain the right number of characters etc.
		event.target.checkValidity();
	}

	onClick (event) {
		// prevent default stops a full-page form submission
		event.preventDefault();

		// if form data does not pass the validation checks, return early and end the onClick function
		if (!event.target.checkValidity()){
			return;
		}

		// contains http method and headers
		let initVar = {
			method: this.props.method,
			headers: this.props.headers,
		};

		// don't want an http body if it's for a get request, just for post/put/delete
		if (this.props.method !== "GET") {
			// if not a get method, create a body key that's equal to the data taken from the html form
			initVar.body = JSON.stringify(this.state.formData);
		}

		// http request using fetch to the API url, pass in the method/headers/body, return a promise
		fetch(this.props.url, initVar).then((response) => {
			// when response returns, .json returns a json object, and then passes it into the callback function
			response.json().then((object) => {
				// set the response object in state for displaying on the page
				this.setState({ response: object});
			});
		});
	}

	render () {
		return (
			<div className="api">
				<div>
					{/* render the different keys from the header/body on the page */}
					<div className="header">
						<h1 className={ ["method", this.props.method.toLowerCase()].join(" ") }>{this.props.method}</h1>
						<h1 className="url">{this.props.url}</h1>
					</div>
					<p>Name: {this.props.name}</p>
					<p>Description: {this.props.description}</p>
					{
						// headers contained in an object, so use map to cycle over each one and place it in a p tag
						Object.keys(this.props.headers).map( (header, i) => {
							return (
								<div key={i}>
									<p>{header}: {this.props.headers[header]}</p>
								</div>
							);
						})
					}
					<form onSubmit={ (event) => this.onClick(event)}>
						{
							// && statements resolve to condition on right side of statement, e.g. map(), if true
							// e.g. 1 && 2 gives 2, 1 && 0 gives 0
							// in this case, if body is null, won't run map, so like a short-hand for a ternary without a falsey value
							// use map again to cycle through the body and return a label and form input for each key
							this.props.body && this.props.body.map( (bodyField, i) => {
								return (
									<div key={i}>
										<p>{bodyField.label}: <input name={bodyField.name} type={bodyField.type || "text"} placeholder={bodyField.placeholder} required={bodyField.required || false}  maxLength={bodyField.max} minLength={bodyField.min} pattern={bodyField.pattern} onChange={ (event) => this.onBlur(event)}></input></p>
									</div>
								);
							})
						}
						{/* render a button for form submission */}
						<Button></Button>
					</form>
				</div>
				{/* display the http response in the page using the ApiResponse component */}
				<ApiResponse response={this.state.response}/>
			</div>
		);
	}
}

export class Button extends React.Component {
	render () {
		return <button className="button">Send API Call</button>;
	}
}

// component for http response
export class ApiResponse extends React.Component {
	render () {
		return (
			<div className="apiresponse">
				{
					// returns the response as a json data, indented 4 spaces
					JSON.stringify(this.props.response, null, 4)
				}
			</div>
		);
	}
}
