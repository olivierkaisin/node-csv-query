"use strict";


var _ = require("lodash");
var Promise = require("bluebird");
var engine = require("./engine");


// Db container
function Db()
{
  this.rows = [];
}


Db.prototype.pushRow = function (row)
{
  if (!_.isObject(row)) {
    throw new Error("row must be an object");
  }

  this.rows.push(row);
};


Db.prototype.find = function (query, options)
{
  var self = this;

  return Promise.try(function () {
    return self.rows.filter(function (row) {
      return engine.matchRowAgainstQuery(row, query, options);
    });
  }); 
};


Db.prototype.findOne = function (query) 
{
  return this.find(query).then(function (rows) {
    return rows.length > 0 ? rows[0] : null;
  });
};



module.exports = Db;
