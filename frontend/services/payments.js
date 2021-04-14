var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var payments = express();

// The checkout route
const checkout = require('./routes/checkout');
app.use('/checkout', checkout);

// view engine setup
payments.set('views', path.join(__dirname, 'views'));
payments.set('view engine', 'hbs');

payments.use(logger('dev'));
payments.use(express.json());
payments.use(express.urlencoded({ extended: false }));
payments.use(cookieParser());
payments.use(express.static(path.join(__dirname, 'public')));

payments.use('/', indexRouter);
payments.use('/users', usersRouter);

// catch 404 and forward to error handler
payments.use(function(req, res, next) {
  next(createError(404));
});

// error handler
payments.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = payments;

/*
//import { requestOneTimePayment, requestBillingAgreement } from 'react-native-paypal';
import axios from 'axios';
import URL from './environment';

var button = document.querySelector('#submit-button');

braintree.dropin.create({
  authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
  selector: '#dropin-container'
}, function (err, instance) {
  button.addEventListener('click', function () {
    instance.requestPaymentMethod(function (err, payload) {
      // Submit payload.nonce to your server
    });
  })
});

/*
const getToken = async () => {
  try {
    const res = await axios.get('/token'); // need IP address of the network the phone is on. MyResNet does not give me acccess to other devices :/
    // Should i just put my Node server on heroku so i dont have to deal w/ this issue
    console.log(res);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};
*/

/* const pay = async (amount) => {
    const {
        nonce,
        payerId,
        email,
        firstName,
        lastName,
        phone
    } = await requestOneTimePayment(
      token,
      {
        amount: '5', // required
        currency: 'GBP',
        localeCode: 'en_GB', 
        shippingAddressRequired: true,
        userAction: 'commit', // display 'Pay Now' on the PayPal review page
        // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
        intent: 'authorize', 
      }
    );
}
*/

/*
export {
  getToken,
  //  pay,
};
*/