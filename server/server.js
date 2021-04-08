const express = require("express");
const braintree = require("braintree");
const config = require("./config");
const { response } = require("express");
const https = require("https");

const gateway = new braintree.BraintreeGateway(config);

// https://developers.braintreepayments.com/start/hello-server/node
// https://github.com/smarkets/react-native-paypal/blob/master/exampleServer/server.js

const hostname = '127.0.0.1' // for integration testing w/ phone
const port = process.env.PORT || 3002; // backend testing

app.use("/token", (req, response) => {
  // this is working
  gateway.clientToken.generate(
    {
      customerId: randomNumFromReq,
    },
    (err, res) => {
      if (err) console.log(err);
      // pass clientToken to your front-end
      return response.send(
        JSON.stringify({ success: true, clientToken: res.clientToken })
      );
    }
  );
});

app.post("/checkout", (req, res) => {
  const nonceFromTheClient = req.body.payment_method_nonce;
  gateway.transaction.sale({
    amount: "10.00" , // req.total
    paymentMethodNonce: nonceFromTheClient,
    deviceData: deviceDataFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, (err, result) => {
    if(err) console.error(err);
    res.end(JSON.stringify(result));

  });
});

app.use("/pay", (req, res) => {
  let data = "";
  req.on("data", (chunk) => { // listen for a data event from the client request
    data += chunk;
  });
  req.on("end", () => {
    const { nonce, amount } = JSON.parse(data); // parse string into obj 
    gateway.transaction.sale(
      {
        amount: amount, // should not take amounts in production
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      (err, result) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ success: false, err, result }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(result));
        }
      }
    );
  });
});

const httpsServer = https.createServer(app); // could add credentials

const app = express();

app.listen(port, hostname, (err) => {
  if (err) console.error(err);
  console.log(`Server running on ${hostname}:${port}`);
});
