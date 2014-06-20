#!/usr/bin/env node --harmony

/***
 firstServer.js
 This is a simple server illustrating middleware and basic REST functionality
 ***/

'use strict';
const
express = require('express'), bodyParser = require('body-parser'), // this allows us to pass JSON values to the server (see app.put below)
app = express();

var nextID = 4;

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
    var item = null;
    for(var i=0; i<myData.length; i++){
        if (myData[i].id == n)
          item = myData[i];
    }
    res.json(200, item);
});

// get all items from the model
app.get('/showall.json', function(req, res) {
    res.json(200, myData);
});

// change an item in the model
app.put('/model/:id', function(req, res) {
    var id = req.params.id;
    var n = -1;
    for(var i=0; i<myData.length; i++){
        if (myData[i].id == id)
          n=i;
          break;
    }
    if (n >=0) {
        myData[n] = req.body;
    }
    // put in some error checking if n <= myData.length
    res.json(200, {});
});

// add new item to the model
app.post('/model', function(req, res) {
    console.log("post ... "+JSON.stringify(req.body));
    req.body.id = nextID;
    nextID++;
    myData.push(req.body);
    res.json(200, {});
});

// delete a particular item from the model
app.delete('/model/:id', function(req, res) {
    var id = req.params.id;
    console.log("deleting "+id);
    var n = -1;
    for(var i=0; i<myData.length; i++){
        console.log("testing "+JSON.stringify(myData[i]));
        if (myData[i].id == id)
          n=i;
      
    }
    console.log("out of loop with n="+n);
    if (n >= 0){
        myData.splice(n,1);
    }
    console.log("myData = "+JSON.stringify(myData));
    res.json(200, {});
});


// listen on port 3000
var port = 3000;
app.listen(port, function() {
    console.log("server is listening on port " + port);
});
