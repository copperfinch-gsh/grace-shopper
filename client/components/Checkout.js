import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from './constants/stripe';
import history from '../history';
import store from '../store';
import { submitCart } from '../store/cart';

const CURRENCY = 'USD';

const successPayment = async data => {
  alert('Payment Successful');
  try {
    await axios.put('/api/orders/checkout');
    store.dispatch(submitCart());
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios
    .post('/api/payment', {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: amount
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
