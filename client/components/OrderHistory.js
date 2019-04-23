import React from 'react';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';
import { Card } from 'react-bootstrap';
import { formatWithCommas } from '../utils';

const OrderHistory = ({ history }) => {
  return (
    <div>
      {' '}
      {history.map(order => (
        <Card key={order.id} className="order-container">
          {' '}
          <div>
            {' '}
            <strong>Order number: {order.id}</strong>{' '}
          </div>
          <table>
            <ol className="order-list">
              {' '}
              {order.products.map(prod => (
                <OrderItem key={prod.name} {...prod} />
              ))}{' '}
            </ol>{' '}
          </table>
          <div className="total">
            {' '}
            <span>Total:</span> <span>${totalCalc(order.products)}</span>{' '}
          </div>
        </Card>
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
