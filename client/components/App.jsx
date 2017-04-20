import React from "react";
import { endpoints } from "../endpoints";
// import endpoints array so we can access the http headers, body etc. for sending in the http request

// app component renders page as a whole, containing the header and api sections
export class App extends React.Component {
	render () {
		return (
			<div className="app">
				<div className="title">
					<img className="logo"></img>
					<img className="tagline"></img>
				</div>
				{
					// for each object in the endpoints array, want to make a new instantiation of the Api component containing the method, url, name etc.
					endpoints.map( endpoint => {
						return <Api key={endpoint.method + endpoint.url} name={endpoint.name} url={endpoint.url} method={endpoint.method} headers={endpoint.headers} body={endpoint.body} description={endpoint.description}/>;
					})
				}
			</div>
		);
	}
}

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

		if (!event.target.checkValidity()){
			return;
		}

		let initVar = {
			method: this.props.method,
			headers: this.props.headers,
		};

		if (this.props.method !== "GET") {
			initVar.body = JSON.stringify(this.state.formData);
		}

		fetch(this.props.url, initVar).then((response) => {
			response.json().then((object) => {
				this.setState({ response: object});
			});
		});
	}

	render () {
		return (
			<div className="api">
				<div>
					<div className="header">
						<h1 className={ ["method", this.props.method.toLowerCase()].join(" ") }>{this.props.method}</h1>
						<h1 className="url">{this.props.url}</h1>
					</div>
					<p>Name: {this.props.name}</p>
					<p>Description: {this.props.description}</p>
					{
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
							// in this case, if body is null, won't run map
							// like a short-hand for a ternary without a falsey value
							this.props.body && this.props.body.map( (bodyField, i) => {
								return (
									<div key={i}>
										<p>{bodyField.label}: <input name={bodyField.name} type={bodyField.type || "text"} placeholder={bodyField.placeholder} required={bodyField.required || false}  maxLength={bodyField.max} minLength={bodyField.min} pattern={bodyField.pattern} onChange={ (event) => this.onBlur(event)}></input></p>
									</div>
								);
							})
						}
						<Button></Button>
					</form>
				</div>
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

export class ApiResponse extends React.Component {
	render () {
		return (
			<div>
				{
					this.props.response && Object.keys(this.props.response).map( (data, i) => {
						return (
							<div key={i}>
								<p>{data}: {this.props.response[data]}</p>
							</div>
						);
					})
				}
			</div>
		);
	}
}
