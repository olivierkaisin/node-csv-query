"use strict";



var csvParse = require("csv-parse");
var es = require("event-stream");
var _ = require("lodash");
var fs = require("fs");
var Promise = require("bluebird");
var Db = require("./db");



function mapToObject(row, header)
{
  return header.reduce(function (obj, field, index) {
    obj[field] = row[index];
    return obj;
  }, {});
}



function createFromFile(filePath, options)
{
  options = options || {};

  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exists");
  }

  var db = new Db();
  var deferred = Promise.defer();
  var header;

  var receiver = es.through(function (row) {
    if (!header) {
      header = row;
    } else {
      db.pushRow(
        mapToObject(row, header)
      );
    }
  }, function () {
    deferred.resolve(db);
    this.emit("end");
  }).on("error", deferred.callback);

  var parser = csvParse({ delimiter: options.delimiter || "," });

  fs.createReadStream(filePath)
    .pipe(parser)
    .pipe(receiver);

  return deferred.promise;
}



module.exports.createFromFile = createFromFile;
