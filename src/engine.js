"use strict";



function stringifyQuery(query)
{
  for (var k in query) {
    query[k] = String(query[k]);
  }
  return query;
}



function matchRowAgainstQuery(row, query, options)
{
  options = options || {};

  var caseInsensitive = options.caseInsensitive;
  var trimWhitespaces = options.trimWhitespaces;

  query = stringifyQuery(query);

  for (var field in query) {
    var expected = query[field];
    var value    = row[field];

    if (!value) {
      return false;
    }
    value = value.toString();

    if (caseInsensitive) {
      expected = expected.toLowerCase();
      value = value.toLowerCase();
    }
    if (trimWhitespaces) {
      expected = expected.trim();
      value = value.trim();
    }

    if (expected !== value) {
      return false;
    }
  }

  return true;
}



module.exports.matchRowAgainstQuery = matchRowAgainstQuery;
