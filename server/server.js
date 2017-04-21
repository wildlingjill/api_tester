// get the http module:
var http = require("http");

// path needed for the path.join in the res.sendFile function
var path = require("path");

// body parser needed to accept post/put requests
var bodyParser = require("body-parser");

// requires and instantiates an express server
var express = require("express");
var app = express();

// use bodyParser for json requests
app.use(bodyParser.json());

var gasObject = {
	ownerName: "Jill Robinson",
	emailAddress: "jill@coding.com",
	carMake: "Mazda 3",
	gasData: {
		gasLevel: "70%",
		gasType: "Premium",
	}
}

// serves html file with get request and res.sendFile
app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "../client", "index.html"));
});

// get request gets info about gas status
app.get("/api/gas/delivery/", function(req, res){
    res.json(gasObject);
})

// post request makes new request for gas delivery
app.post("/api/gas/delivery/", function(req, res){
	if (req.body.email) {
		gasObject.emailAddress = req.body.email;
	}
	if (req.body.name) {
		gasObject.ownerName = req.body.name;
	}
	if (req.body.phone) {
		gasObject.cellNumber = req.body.phone;
	}
	// send other data back in res.json
	gasObject.nextDelivery = req.body.date;
	res.json(gasObject);
})

// put request updates gas delivery, e.g. date
app.put("/api/gas/delivery/", function(req, res){
	if (req.body.email) {
		gasObject.emailAddress = req.body.email;
	}
	if (req.body.name) {
		gasObject.ownerName = req.body.name;
	}
	if (req.body.phone) {
		gasObject.cellNumber = req.body.phone;
	}
	gasObject.nextDelivery = req.body.date;
	res.json(gasObject);
})

// delete request deletes gas delivery request
app.delete("/api/gas/delivery/", function(req, res){
	if (req.body.email) {
		gasObject.emailAddress = req.body.email;
	}
	if (req.body.name) {
		gasObject.ownerName = req.body.name;
	}
	if (req.body.phone) {
		gasObject.cellNumber = req.body.phone;
	}
	delete gasObject.nextDelivery;
	res.json(gasObject);
})

// creates a url called static and mounts the dist folder under that url
app.use('/static', express.static(path.join(__dirname, '../dist')));

// tells server to listen on port 6789
app.listen(6789);
