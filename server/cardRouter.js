var imageUtil = require('./imageUtil');
var helpers = require('./helpers');

module.exports = function(app) {
  app.post('/card', function(req, res) {
    var photo = helpers.decodeBase64Image(req.body.photo);
    var drawing = helpers.decodeBase64Image(req.body.drawing);

    imageUtil.composeImage(drawing, photo, function(err, image) {
      if (err) {
        console.log(err);
        res.send(400);
      } else {
        res.send(200);
      }
    })
  });
}
