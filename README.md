node-csv-query
==============

Turn your CSV files to queryable objects 


## How to use

```javascript
"use strict";


var csv = require("csv-query");


csv.createFromFile(
  __dirname + "/dataset.csv"
).then(function (db) {
  return db.findOne({ 
    firstName: "Olivier" 
  });
}).then(function (record) {
  // Do some stuff
}).catch(function (error) {
  throw error;
});

```
