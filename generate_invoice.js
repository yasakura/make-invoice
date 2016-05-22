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
      , jsonWithSums = calculatingAmounts(json)
      , template = handlebars.compile(data.toString())
      , outputString = template(jsonWithSums);

    return outputString;
  }

  function calculatingAmounts(json) {
    var sum = 0;

    json.item.forEach(function(element) {
      var process = Number.parseFloat(element.amount) * Number.parseFloat(element.unit_price)
        , processFormat = convertFormat(process);

      element.sum = deleteCurrency(processFormat);

      sum = sum + process;
    });

    json.total = deleteCurrency(convertFormat(sum));
    return json;
  }

  function convertFormat(argv) {
    return new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' }).format(argv);
  }

  function deleteCurrency(x) {
    return x.toString().replace('€', '');
  }

  var childArgs = [
    path.join('./', 'phantom.js')
  ];

  childProcess.execFile(binPath, childArgs, function() {
    fs.rename('./invoice.pdf', nameInvoice, function(err) {
      if (err) throw err;
      fs.unlink('./template/invoice.html');
    });
    console.log('Generated invoice : '+nameInvoice);
  });
})();