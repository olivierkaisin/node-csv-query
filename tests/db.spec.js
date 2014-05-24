"use strict";


/* global it,describe */


var csvDb = require("../");
var assert = require("chai").assert;


describe("db", function () {
  it("should load", function (done) {
    csvDb.createFromFile(
      __dirname + "/fixtures/dataset.csv"
    ).then(function (db) {
      done();
    }).catch(function (error) {
      throw error;
    });
  });


  it("should find records", function (done) {
    csvDb.createFromFile(
      __dirname + "/fixtures/dataset.csv"
    ).then(function (db) {
      return [
        db.findOne({ firstName: "Olivier" }), 
        db.find({ firstName: "Alex" })
      ];
    }).spread(function (record, records) {
      assert.isNotNull(record);
      assert.strictEqual(records.length, 2);
    }).then(
      done
    ).catch(function (error) {
      throw error;
    });
  });
});
