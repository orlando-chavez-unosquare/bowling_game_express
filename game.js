var express = require('express');
var app = express();
exports.app = app; // exports.app is for testing framework

app.listen(3000, function(){
  console.log("Listening on port 3000.");
});

var score = 0;

app.get("/score", function (req, res){
  res.send({score: score});
});
