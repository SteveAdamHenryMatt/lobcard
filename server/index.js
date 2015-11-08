var braintree = require('braintree');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
 
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '9frnzdybn5t2r6zv',
  publicKey: 'ctpc3f39h3pxp7r6',
  privateKey: '53d7230c78689289dd1c2da86c201b42'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

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

app.use(express.static(path.join(__dirname, '../client')));

// app.get('/', function(req, res){
//   

// });

module.exports = app.listen(3000);

 
