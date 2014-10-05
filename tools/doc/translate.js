var fs = require('fs');
var path = require('path');

exports.generateTranslationFiles = generateTranslationFiles
function generateTranslationFiles(inputFile, i18n) {
  i18n.forEach(function(lang) {
    var translationFile = inputFile.replace(/index.md$/, lang + '.md'),
        translationConfigFile = translationFile.replace(/.md$/, '.json'),
        configFile = inputFile.replace(/.md$/, '.json');

    if (!fs.existsSync(translationFile)) {
      fs.writeFileSync(translationFile, '');
    }

    if (fs.existsSync(configFile) && !fs.existsSync(translationConfigFile)) {
      var content = fs.readFileSync(configFile, 'utf8');

      fs.writeFileSync(translationConfigFile, content);
    }
  });
}
