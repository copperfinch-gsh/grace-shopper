import React from 'react';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';

const OrderHistory = ({ history }) => {
  return (
    <div>
      {' '}
      {history.map(order => (
        <div key={order.id}>
          {' '}
          <div>Order number: {order.id} </div>
          <ol>
            {' '}
            {order.products.map(prod => (
              <OrderItem key={prod.name} {...prod} />
            ))}{' '}
          </ol>{' '}
          <div> Total: ${totalCalc(order.products)} </div>
        </div>
      ))}{' '}
    </div>
  );
};

const mapState = state => ({
  history: state.orders
});

export default connect(mapState)(OrderHistory);

//to move to utils file
function totalCalc(productArr) {
  let total =
    productArr.reduce((accum, prod) => prod.price * prod.quantity + accum, 0) /
    100;
  return formatWithCommas(total);
}

function formatWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
