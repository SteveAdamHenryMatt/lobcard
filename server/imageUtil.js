var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var path = require('path');

var Promise = require('bluebird');
var writeFileAsync = Promise.promisify(fs.writeFile);

module.exports.composeImage = function(drawingBuffer, photoBuffer, callback) {
  var rand = Math.floor(Math.random() * 1000);
  var width = 1875;
  var height = 1275;
  var drawingPath = path.join(__dirname, '/../temp/drawing' + rand + '.png');
  var photoPath = path.join(__dirname, '/../temp/photo' + rand + '.jpg');

  writeFileAsync(drawingPath, drawingBuffer.data)
    .then(function() {
      return writeFileAsync(photoPath, photoBuffer.data);
    })
    .then(function() {
      gm(drawingPath)
        .resize(width, height)
        .write(path.join(__dirname, '../temp/' + rand + '.png'), function(err) {
          if (err) {
            callback(err);
            return;
          }
          gm().command('composite')
            .in('-gravity', 'center')
            .in('-background', 'none')
            .in(path.join(__dirname, '../temp/' + rand + '.png'))
            .in(photoPath)
            .write(path.join(__dirname, '../postcards/' + rand + '.jpg'), function(err) {
              if (err) {
                callback(err);
                return;
              }
              fs.readFile(path.join(__dirname, '../postcards/' + rand + '.jpg'), function(err, data) {
                if (err) {
                  callback(err);
                  return;
                }
                callback(null, data);
              });
            });
        });
    });
};
