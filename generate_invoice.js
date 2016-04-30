'use strict';

(function(){
  var handlebars = require('handlebars')
    , fs = require('fs');

  fs.readFile('./template/invoice_ae.hbs', 'utf8', function(err, data) {
    if (err) throw err;
    writeFile(data);
  });

  function writeFile(data) {
    fs.writeFile('./template/invoice.html', compileHandlebars(data), function(err){
      if (err) throw err;
    });
  }

  function compileHandlebars(data) {
    var json = require('./data.json')
      , template = handlebars.compile(data.toString())
      , outputString = template(json);

    return outputString;
  }
})();