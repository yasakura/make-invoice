'use strict';

(function(){
  var argv = require('yargs').argv
    , pathJson = argv.json || './data_example.json'
    , nameInvoice = argv.name || './invoice.pdf'
    , handlebars = require('handlebars')
    , fs = require('fs')
    , path = require('path')
    , childProcess = require('child_process')
    , phantomjs = require('phantomjs-prebuilt')
    , binPath = phantomjs.path;

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
    var json = require(pathJson)
      , template = handlebars.compile(data.toString())
      , outputString = template(json);

    return outputString;
  }

  var childArgs = [
    path.join('./', 'phantom.js')
  ];

  childProcess.execFile(binPath, childArgs, function() {
    fs.rename('./invoice.pdf', nameInvoice, function(err) {
      if (err) throw err;
      fs.unlink('./template/invoice.html');
    });
    console.log('Facture généré : '+nameInvoice);
  });
})();