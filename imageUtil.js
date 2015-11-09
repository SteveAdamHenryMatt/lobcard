var autotrace = require('autotrace');
var gm = require('gm').subClass({imageMagick: true});
var fs = require('fs');

module.exports.composeImage = function (drawing, photo, callback) {
  var width = 1875;
  var height = 1275;
  gm(input)
    .resize(width, height).write('./temp1.png', function(err) {
      if (err) callback(err);
      gm().command('composite')
        .in('-gravity', 'center')
        .in('-background', 'none')
        .in('./temp1.png')
        .in(photo)
        .write('out2.jpg', function(err) {
          if (err) callback(err);

        });
    });
}

var input = './input.png';
var photo = 'matts.jpg';
