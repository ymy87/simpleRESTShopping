#!/usr/bin/env node --harmony
/***
firstServer.js
This is a simple server illustrating middleware and basic REST functionality
***/

'use strict';
const
  express = require('express'),
  bodyParser = require('body-parser'), // this allows us to pass JSON values to the server (see app.put below)
  app = express();
  
var myData = ["hola","mundo","a","b","c","d"];

// serve static content from the public folder 
app.use("/",express.static(__dirname + '/public'));

app.use(bodyParser.json());


// create middleware to log the requests
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// define functionality for handling get request of the form /greeting/NAME
app.get('/model/:id', function(req, res) {
    var n = req.params.id;
    console.log("get id="+n+" typeof(n)="+typeof(n));
  res.json(200, { "id": myData[n] });
});

app.get('/showall', function(req, res) {
    var n = req.params.id;
    console.log("get id="+n+" typeof(n)="+typeof(n));
  res.json(200, { "id": myData });
});

// define functionality for handling get request of the form /greeting/NAME
app.put('/model/:id', function(req, res) {
    var n = req.params.id;
    console.log("put id="+n+"request = "+req.body);
    var body = req.body;
    myData[body.id] = body.val;
  res.json(200, { "id": body.id, "val": myData[body.id] });
});

// define functionality for handling get request of the form /greeting/NAME
app.post('/model/:id', function(req, res) {
      var n = req.params.id;
      console.log("post id="+n+"request = "+req.body);
      var body = req.body;
      myData[body.id] = body.val;
    res.json(200, { "id": body.id, "val": myData[body.id] });
});


// listen on port 3000
var port=3000;
app.listen(port, function(){
  console.log("server is listening on port "+port);
});

