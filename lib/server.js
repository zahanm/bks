
var express = require('express');
var optimist = require('optimist');
var path = require('path');

var ARGV = optimist.usage("Dandy visualizations.\nUsage: $0")
  .options({
    'p': {
      alias: 'port',
      desc: 'port number to listen on'
    }
  })
  .argv;

var app = express();

app.use(express.static( path.join(__dirname, 'public') ));
app.use(express.bodyParser());

var port = ARGV.port || 8080;
app.listen(port, function () {
  console.log("Hit me up at http://localhost:" + port + "/");
});
