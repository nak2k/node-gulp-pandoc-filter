var fs = require('vinyl-fs');
var pandoc = require('gulp-pandoc');
var pandocFilter = require('gulp-pandoc-filter');
var map = require('map-stream');

fs.src('./*.md')
  .pipe(pandoc({
    from: 'markdown',
    to: 'json',
    ext: '.json',
    args: [],
  }))
  .pipe(pandocFilter(function(file, type, value, format, meta) {
    if (type === 'CodeBlock') {
      return pandocFilter.CodeBlock(
        ['', [], []],
        `file.relative = '${file.relative}';\n` +
        `file.path = '${file.path}';`
      );
    }
  }))
  .pipe(pandoc({
    from: 'json',
    to: 'markdown',
    ext: '.md',
    args: [],
  }))
  .pipe(map(function(file, callback) {
    callback(null, file.contents);
  }))
  .pipe(process.stdout);
