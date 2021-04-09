const express = require("express");
const braintree = require("braintree");
const helmet = require("helmet");
const config = require("./config");
const https = require("https");

// https://developers.braintreepayments.com/start/hello-server/node
// https://github.com/smarkets/react-native-paypal/blob/master/exampleServer/server.js

const port = process.env.PORT || 3002;

const app = express();

app.use(helmet({}));

const gateway = new braintree.BraintreeGateway(config);

let aCustomerId;


app.use("/hi", (req, res) => {
  res.json({ message: "hey" });
});

app.use("/token", async (req, res) => {
  //await createToken();
  gateway.clientToken.generate(
    {
      //customerId: aCustomerId, we dont have any customers vaulted
    },
    (err, response) => {
      if (err) {
        console.log(err);
        res.json({ error: "There was an issue." });
      }
      // pass clientToken to your front-end
      console.log("success")
      return res.send(
        JSON.stringify({ success: true, clientToken: response.clientToken })
      );
    }
  );
});

app.use("/pay", (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    const { nonce, amount, deviceData } = JSON.parse(data);
    gateway.transaction.sale(
      {
        amount,
        paymentMethodNonce: nonce,
        deviceData: deviceData,
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

//httpsServer.listen(3005);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on PORT ${port}`);
});
