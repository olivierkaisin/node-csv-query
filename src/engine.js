"use strict";



function matchRowAgainstQuery(row, query, options)
{
  options = options || {};

  var caseInsensitive = options.caseInsensitive;
  var trimWhitespaces = options.trimWhitespaces;

  for (var field in query) {
    var expected = query[field].toString();
    var value    = row[field].toString();

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
