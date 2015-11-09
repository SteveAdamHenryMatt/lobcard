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

// resize > compose on white > autotrace > compose on photo
gm(input)
  .resize(width, height).write('./temp1.png', function(err) {
    if (err) console.log(err);
    gm().command('composite')
      .in('-gravity', 'center')
      .in('./temp1.png')
      .in('white.png') // convert -size 1875x1275 xc:white white.png
      .write('./temp2.png', function(err) {
        if (err) console.log(err);
        autotrace('./temp2.png', {
          outputFile: './overlay.svg',
          backgroundColor: 'FFFFFF'
        }, function(err, buffer) {
          if (!err) console.log('done');
          gm().command('composite')
            .in('-gravity', 'center')
            .in('-background', 'none')
            .in('./overlay.svg')
            .in(photo)
            .write('out1.jpg', function(err) {
              if (err) console.log(err);
            });
        });
      });
  });

// resize > compose on photo


// resize > compose on white > autotrace > compose on photo
gm().command('composite')
  .in('-gravity', 'center')
  .in(input)
  .in('white-small.png') // convert -size 600x408 xc:white white.png
  .write('./temp1.png', function(err) {
    if (err) console.log(err);
    autotrace('./temp1.png', {
      outputFile: './overlay.svg',
      backgroundColor: 'FFFFFF'
    }, function(err, buffer) {
      if (!err) console.log('done');
      gm('./overlay.svg')
        .resize(width, height).write('./temp2.png', function(err) {
          if (err) console.log(err);
          gm().command('composite')
            .in('-gravity', 'center')
            .in('-background', 'none')
            .in('./overlay.svg')
            .in(photo)
            .write('out3.jpg', function(err) {
              if (err) console.log(err);
            });
        });
      });
  });

/*
IMAGE MAGICK COMMAND
SVG input: overlay.svg
Image Width: 1200
Image Height: 600
Photo: photo.jpg
Final image: out.jpg

composite -compose atop \( -gravity southwest -background none overlay.svg -resize 1200x600 \) photo.jpg out.jpg

*/
