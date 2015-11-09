var braintree = require('braintree');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var cardRouter = require('./cardRouter');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});
var port = process.env.PORT || 3000;

app.post("/checkout", function (req, res) {
  var nonce = req.body.nonce;
  console.log("-------------------------------------------", nonce);
  gateway.transaction.sale({
    amount: '1.25',
    paymentMethodNonce: nonce,
    options: {
      submitForSettlement: true
    }
  },
    function(err, result) {
      if (result) {
        if (result.success) {
          console.log("Transaction ID: " + result.transaction.id);
          res.sendStatus(200);
        } else {
          console.log(result.message);
        }
      } else {
        console.log(err);
        res.sendStatus(500);
      }
  });
});

cardRouter(app);

app.use(express.static(path.join(__dirname, '../client')));

// app.get('/', function(req, res){
//

// });

module.exports = app.listen(port, function(){
  console.log("Listening on: " + port);
});


