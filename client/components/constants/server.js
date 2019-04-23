const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://grace-shredder.herokuapp.com/'
  : 'http://localhost:8081';

export default PAYMENT_SERVER_URL;
