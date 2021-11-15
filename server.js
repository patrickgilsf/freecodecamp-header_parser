// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//////////////////////////////////////////////////////////////////////////
//This is where my project starts

//Install packages
  //ip-address
const requestIp = require('@supercharge/request-ip');
  //DL'd a few different packages for language, didn't need them.
  //Using ua-parser for 'software'
var http = require('http');
var parser = require('ua-parser-js');

//Object to put responses
var resObj = {}

//handlers
app.get('/api/whoami/', (req, res, next) => {
//lets me know I hit the API
  console.log("whoami hit");
//converts to an IPv4  
  var reqIp = requestIp.getClientIp(req);
  resObj['ipaddress'] = reqIp;
//Detects preferred language  
  var lang = req.headers["accept-language"]
  resObj['language'] = lang;
//Detects software
  var ua = parser(req.headers['user-agent']);
  resObj['software'] = ua["ua"];
  res.json(resObj);
})

