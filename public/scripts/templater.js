(function(global) {

'use strict';

// -- invariants
var Mustache = global.Mustache;
var XMLHttpRequest = global.XMLHttpRequest;
if (!Mustache || !XMLHttpRequest) {
  console.error('Mustache and XMLHttpRequest are requirements');
  return;
}

// -- globals
var cache = {};

// -- helpers
function fetch(endpoint, callback) {

}

// -- Templater
global.Templater = {

  render: function() {

  }

};

}(window));