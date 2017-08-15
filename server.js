var express = require('express'); 
var app = express(); 
//we can now use functions and commands contained within express module in server.js

var mongojs = require('mongojs');
var db = mongojs('studentlist',['studentlist']);	//which mongodb and collection to be used
//we can now use functions and commands contained within mongojs module in server.js

var bodyParser = require('body-parser');
//we can now use functions and commands contained within body-parser module in server.js

//check if the server is running correctly
/*app.get('/', function (req, res) { 	// '/' - set route to index page
	res.send("Hello")					
});
*/

app.use(express.static(__dirname + "/public"));		// static includes static files: html, css, js and image files
													// __dirname + "/public": location of the static file

app.use(bodyParser.json());		//server can parse the body of the input it receives

app.get('/studentlist', function(req, res) {
	console.log("Received get request");
	
	db.studentlist.find(function(err,docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/studentlist', function(req, res) { 	//listens post request from controller.js
	console.log(req.body);					  	//prints data that it receives from cmd prompt i.e data received from the body of the input data
	db.studentlist.insert(req.body, function(err, doc) {
		res.json(doc);	//send data to the controller
		//inserts the i/p data into the database as well as sends the new data from database back to the controller

	})	
});

app.delete('/studentlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.studentlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});

app.get('/studentlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.studentlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
})

app.put('/studentlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.studentlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, score: req.body.score, grade: req.body.grade}},
		new: true}, function(err, doc) {
			res.json(doc);
	})
});
								
													
app.listen(8080);
console.log("Server running on port 8080");	//port of localhost