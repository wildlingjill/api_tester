var expect = require("chai").expect;
// request makes HTTP requests
var request = require("request");

// description of the functionality we want to test
describe("API Testing tool", function() {


	describe("Get gas details", function() {

		// store the full path to the resource we want to test in a variable, run server on port 6789 - in a bigger test suite would probably store the host part of the url in a global variable to reuse
		var url = "http://localhost:6789/api/gas/delivery/";

		// want to test the status code for making a get request to this url
		it("returns status 200", function(done) {

			// request package makes the http call to the url, takes two arguments - a url to visit and a function to be invoked when the request is completed. set up expectations inside callback function
			request.get(url, function(error, response, body){
				expect(response.statusCode).to.equal(200);

				// done callback function tells mocha that the above callback is async and it needs to wait for the response value before it checks the expectations
				done();
			});
		});

		// as well as checking status code, also want to check the body object returned
		it("returns the gas details", function(done) {
			request.get(url, function(error, response, body){

				// expecting the parsed body object to contain the keys for owner name and car make
				expect(JSON.parse(body.toString())).to.have.any.keys("ownerName", "carMake");
				done();
			})
		});

	});


	// tests the post request to the url to create a new gas delivery
	describe("Create delivery date", function() {

		var url = "http://localhost:6789/api/gas/delivery/";

		it("returns status 200", function(done) {
			request.post(url, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it("returns the gas details with a delivery date", function(done) {
			request.post(url, function(error, response, body){

				// this time check if the body contains the next delivery key too
				expect(JSON.parse(body.toString())).to.have.any.keys("ownerName", "carMake", "nextDelivery");
				done();
			});
		});

	});


	// tests the put request to the url to update the gas delivery
	describe("Update delivery date", function() {

		var url = "http://localhost:6789/api/gas/delivery/";

		it("returns status 200", function(done) {
			request.put(url, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it("returns the gas details with an updated delivery date", function(done) {
			request.put(url, function(error, response, body){

				// not sure how to test for updated delivery key, so just testing for next delivery key
				expect(JSON.parse(body.toString())).to.have.any.keys("ownerName", "carMake", "nextDelivery");
				done();
			});
		});

	});


	// testing the delete request to delete a gas delivery
	describe("Delete delivery date", function() {

		var url = "http://localhost:6789/api/gas/delivery/";

		it("returns status 200", function(done) {
			request.delete(url, function(error, response, body){
				expect(response.statusCode).to.equal(200);
				done();
			});
		});

		it("returns the gas details without a delivery date", function(done) {
			request.delete(url, function(error, response, body){

				// want to check that the body has the owner and make keys but no longer contains the next delivery key
				expect(JSON.parse(body.toString())).to.have.any.keys("ownerName", "carMake")
					.and.not.have.any.keys("nextDelivery");
				done();
			});
		});

	});
});
