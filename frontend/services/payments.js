//import { requestOneTimePayment, requestBillingAgreement } from 'react-native-paypal';
import axios from 'axios';
import URL from './environment'


const getToken = async () => {
    try {
    const res = await axios.get('/token'); // need IP address of the network the phone is on. MyResNet does not give me acccess to other devices :/
    // Should i just put my Node server on heroku so i dont have to deal w/ this issue
    console.log(res)
    return res.data;
  } catch (err) {
    return console.log(err);
  }
}

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

export {
    getToken,
  //  pay,
    
}