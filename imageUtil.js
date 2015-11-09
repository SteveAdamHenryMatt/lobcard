var autotrace = require('autotrace');
var gm = require('gm').subClass({imageMagick: true});
var fs = require('fs');

module.exports.composeImage = function (drawing, photo, callback) {
  var rand = Math.floor(Math.random()*1000);
  var width = 1875;
  var height = 1275;
  gm(input)
    .resize(width, height).write('./temp/' + rand + '.png', function(err) {
      if (err) callback(err);
      gm().command('composite')
        .in('-gravity', 'center')
        .in('-background', 'none')
        .in('./temp/' + rand + '.png')
        .in(photo)
        .write('./postcards/' + rand + '.jpg', function(err) {
          if (err) callback(err);
          fs.readFile('./postcards/' + rand + '.jpg', function(err, data) {
            if (err) callback(err);
            callback(null, data);
          });
        });
    });
}

