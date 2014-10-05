var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var assert = Lab.assert;

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var tmpPath = path.join(__dirname, 'tmp');

var localize = require('../translate.js');


describe('generate files', function () {

  before(function(done) {
    rimraf.sync(tmpPath);
    mkdirp.sync(tmpPath);
    // create a fixture
    fs.writeFileSync(path.join(tmpPath, 'index.json'), '{ente: "ente"}');
    done();
  });

  after(function(done) {
    rimraf.sync(tmpPath);
    done();
  });

  it('creates a language file', function (done) {
    var file = path.join(tmpPath, 'index.md'),
        exists;

    localize.generateTranslationFiles(file, ['de']);
    exists = fs.existsSync(file.replace('index.md', 'de.md'));
    assert.ok(exists);
    done();
  });

  it('creates a language configurations file', function (done) {
    var file = path.join(tmpPath, 'index.json'),
        exists;

    localize.generateTranslationFiles(file, ['de']);
    exists = fs.existsSync(file.replace('index.json', 'de.json'));
    assert.ok(exists);
    done();
  });

  it('the language configurations file contains content from the index.json', function (done) {
    var file = path.join(tmpPath, 'index.json'),
        content;

    localize.generateTranslationFiles(file, ['de']);
    content = fs.readFileSync(file.replace('index.json', 'de.json'), 'utf8');
    assert.equal(content, '{ente: "ente"}');
    done();
  });
});
