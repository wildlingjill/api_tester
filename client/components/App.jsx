import React from "react";
import { endpoints } from "../endpoints";
// import endpoints array so we can access the http headers, body etc. for sending in the http request
import { Api } from "./Api.jsx";

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
