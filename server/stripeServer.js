const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const SERVER_PORT = 8081;
const PORT = process.env.PORT || SERVER_PORT;
const CORS_WHITELIST = require('./constants/frontend');

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
//set-up cors options
const corsOptions = {
  origin: (origin, callback) => {
    return CORS_WHITELIST.indexOf(origin) !== -1 || !origin
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'));
  }
};

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};
// logging middleware
app.use(morgan('dev'));

//use cors to communicate with our front-end
app.use(cors(corsOptions));

//use express body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//call payment api
app.get('/', (req, res) => {
  res.send({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date().toISOString()
  });
});

app.post('/', async (req, res) => {
  try {
    await stripe.charges.create(req.body, postStripeCharge(res));
  } catch (error) {
    console.error(error);
  }
});
// start listening (and create a 'server' object representing our server)
app.listen(PORT, () => console.log(`Stripe server ${PORT}`));

module.exports = app;
