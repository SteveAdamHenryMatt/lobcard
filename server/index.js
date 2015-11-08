var braintree = require('braintree');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
 
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: '',
  publicKey: '',
  privateKey: ''
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
  });
});

app.use(express.static(path.join(__dirname, '../client')));

// app.get('/', function(req, res){
//   gateway.transaction.sale({
//     amount: '5.00',
//     paymentMethodNonce: "nonce-from-the-client",
//     options: {
//       submitForSettlement: true
//     }
//   },
//     function(err, result) {
//       if (result) {
//         if (result.success) {
//           console.log("Transaction ID: " + result.transaction.id);
//         } else {
//           console.log(result.message);
//         }
//       } else {
//         console.log(err);
//       }
//   });

// });

module.exports = app.listen(3000);

 
