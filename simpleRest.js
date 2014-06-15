#!/usr/bin/env node --harmony

/***
 firstServer.js
 This is a simple server illustrating middleware and basic REST functionality
 ***/

'use strict';
const
express = require('express'), bodyParser = require('body-parser'), // this allows us to pass JSON values to the server (see app.put below)
app = express();

var myData = [{
    "id": 0,
    "action": "Flowers",
    "done": false,
    "price": 1,
    "quantity": 5
}, {
    "id": 1,
    "action": "Shoes",
    "done": false,
    "price": 2,
    "quantity": 4
}, {
    "id": 2,
    "action": "Tickets",
    "done": true,
    "price": 3,
    "quantity": 30
}, {
    "id": 3,
    "action": "Coffee",
    "done": false,
    "price": 4,
    "quantity": 2
}];

// serve static content from the public folder 
app.use("/", express.static(__dirname + '/public'));

app.use(bodyParser.json());


// create middleware to log the requests
app.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, JSON.stringify(req.body));
    next();
});

// get a particular item from the model
app.get('/model/:id', function(req, res) {
    var n = req.params.id;
    res.json(200, myData[n]);
});

// get all items from the model
app.get('/showall.json', function(req, res) {
    res.json(200, myData);
});

// change an item in the model
app.put('/model/:id', function(req, res) {
    var n = req.params.id;
    myData[n] = req.body;
    // put in some error checking if n <= myData.length
    res.json(200, {});
});

// add new item to the model
app.post('/model', function(req, res) {
    req.body.id = myData.length;
    myData.push(req.body);
    res.json(200, {});
});

// get a particular item from the model
app.delete('/model/:id', function(req, res) {
    var n = req.params.id;
    myData.splice(n,1);
    res.json(200, {});
});


// listen on port 3000
var port = 3000;
app.listen(port, function() {
    console.log("server is listening on port " + port);
});
