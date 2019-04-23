import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  editCartThunk,
  submitCartThunk,
  removeFromCartThunk
} from '../store/cart';
import { CartProduct } from '../components';
// import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Checkout from './Checkout';
import { sumCartProducts } from '../utils';

const Cart = ({ cartItems, handleChange, deleteCartProduct, numProducts }) => {
  let [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    console.log('cart items:', cartItems.map(i => i.lineItem));
    setCartTotal(sumCartProducts(cartItems));
  });

  return (
    <div className="container-fluid">
      <Card style={{ width: '40rem' }}>
        <Card.Header
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {' '}
          <h3 id="shopping-cart">Shopping Cart:</h3>
          {cartItems.length > 0 && (
            <Checkout
              name={'Grace Shredder'}
              description={'Your Order'}
              amount={cartTotal}
            />
          )}
        </Card.Header>
        {cartItems.map(item => {
          return (
            <CartProduct
              key={item.id}
              item={item}
              handleChange={handleChange}
              deleteItem={deleteCartProduct}
            />
          );
        })}
      </Card>
      <div> Total: {cartTotal} </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cart.cartProducts
});

const mapDispatchToProps = dispatch => {
  return {
    handleChange: (event, product) => {
      const value = event.target.value;
      dispatch(
        editCartThunk({
          product,
          desiredQuantity: value
        })
      );
    },
    handleClick: () => {
      dispatch(submitCartThunk());
    },
    deleteCartProduct: product => {
      dispatch(removeFromCartThunk({ product }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
