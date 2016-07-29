'use strict';

function makeInvoice(){
  var argv = require('yargs').argv
    , pathJson = __dirname + '/../' + argv.json || __dirname + '/../data_example.json'
    , nameInvoice = argv.name || 'invoice.pdf'
    , handlebars = require('handlebars')
    , fs = require('fs')
    , path = require('path')
    , childProcess = require('child_process')
    , phantomjs = require('phantomjs-prebuilt')
    , binPath = phantomjs.path;

  var nodeStatic = require('node-static')
    , http = require('http');

  // serve
  var server = http.createServer(function (request, response) {
    request.addListener('end', function () {
      file.serve(request, response);
    }).resume();
  });
  var file = new nodeStatic.Server(__dirname + '/../template');

  fs.readFile(__dirname + '/../template/invoice_ae.hbs', 'utf8', function(err, data) {
    if (err) throw err;
    writeFile(data);
  });

  function writeFile(data) {
    fs.writeFile(__dirname + '/../template/invoice.html', compileHandlebars(data), function(err){
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
    path.join(__dirname, '/phantom.js')
  ];

  server.listen(3978);

  childProcess.execFile(binPath, childArgs, function() {
    fs.rename('./invoice.pdf', nameInvoice, function(err) {
      if (err) throw err;
      fs.unlink(__dirname + '/../template/invoice.html');
    });
    server.close();
    console.log('Generated invoice : '+ process.cwd() + '/' + nameInvoice);
  });
}

exports.convert = makeInvoice;