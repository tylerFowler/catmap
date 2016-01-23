function catmap(mappingsPath, _options) {
  var options = _options || { useJson: false }

  if (!options.useJson) { var CSON = require('cson'); }
  var _ = require('underscore');
  var fs   = require('fs');
  var path = require('path');

  var mappings;
  if (options.useJson) {
    mappings = JSON.parse(
      fs.readFileSync(path.join('./', mappingsPath))
    )
  } else {
    mappings = CSON.parse(
      fs.readFileSync(path.join('./', mappingsPath))
    );
  }

  // load file mappings by prepending each one with the given srcDir option
  return _.chain(mappings).mapObject(function createFileMap(v) {
    var srcDir = v.options.srcDir;
    var newEntry = {};

    _.each(v.files, function populateEntries(filesArr, fileKey) {
      newEntry[fileKey] = _.map(filesArr, function expandFilePaths(filePath) {
        return path.join(srcDir, filePath);
      });
    });

    return newEntry;
  })
  .values()
  // map returns shallow array so we need to flatten it out and join all values
  .reduce(function flattenValues(memo, v) { return _.extend(v, memo); })
  .value();
}

module.exports = catmap;
