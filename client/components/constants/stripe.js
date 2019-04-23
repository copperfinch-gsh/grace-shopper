const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_2Jcem5P187ke2iZvwNXBglvt00AQdLy5uH'
    : 'pk_test_2Jcem5P187ke2iZvwNXBglvt00AQdLy5uH';

export default STRIPE_PUBLISHABLE;
