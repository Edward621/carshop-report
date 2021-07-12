const colors = require('colors');
const _ = require('lodash');
const config = require('../config');

var noop = function(){};
var cl = config.logging ? console.log : noop;
var logger = {
  log() {
    var args = _.toArray(arguments)
      .map(arg=>{
        if (typeof arg === 'object') {
          let string = JSON.stringify(args, null, 2);
          return string.yellow;
        } else {
          arg += '';
          return arg.yellow;
        }
      });
    cl.apply(console, args);
  },
}

module.exports = logger;
