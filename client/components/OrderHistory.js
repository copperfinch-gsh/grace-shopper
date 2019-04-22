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
        </div>
      ))}{' '}
    </div>
  );
};

const mapState = state => ({
  history: state.orders
});

export default connect(mapState)(OrderHistory);
