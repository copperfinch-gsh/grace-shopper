const router = require('express').Router();

module.exports = router;

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.get('/', (req, res) => {
  res.send({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date().toISOString()
  });
});

router.post('/', async (req, res) => {
  try {
    await stripe.charges.create(req.body, postStripeCharge(res));
  } catch (error) {
    console.error(error);
  }
});
