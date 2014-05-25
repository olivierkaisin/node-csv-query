node-csv-query
==============

Turn your CSV files to queryable objects.


## How to use

dataset.csv
```
id,firstName,lastName,amountOfBooks
1,Olivier,Kaisin,10
2,Emile-Victor,Portenart,2
3,Alex,Mapolice,42
4,Alex,Gaspy,2
```


How to find the row with `firstName=Olivier`

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


## Credits

- bluebird
- csv-parse
- lodash
- event-stream


## License

MIT
