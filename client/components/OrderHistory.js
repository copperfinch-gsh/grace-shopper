import React from 'react';
import { connect } from 'react-redux';

const OrderHistory = () => {
  return <div> render me! </div>;
};

const mapState = state => ({
  history: state.orders
});

export default connect(null, null)(OrderHistory);
