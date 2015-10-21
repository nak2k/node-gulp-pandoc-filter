var pandocFilter = require('pandoc-filter');
var map = require('map-stream');

module.exports = Object.assign(gulpPandocFilter, pandocFilter);

function gulpPandocFilter(action) {
  return map(function(file, callback) {
    var data = JSON.parse(file.contents);

    var out = pandocFilter.filter(data, function(type, value, format, meta) {
      return action(file, type, value, format, meta);
    }, null);

    file.contents = new Buffer(JSON.stringify(out));

    callback(null, file);
  });
}
