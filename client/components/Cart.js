import React from 'react';
import { connect } from 'react-redux';
import {
  editCartThunk,
  submitCartThunk,
  removeFromCartThunk
} from '../store/cart';
import { CartProduct } from '../components';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const Cart = ({ cartItems, handleChange, handleClick, deleteCartProduct }) => {
  return (
    <div className="container-fluid">
      <style jsx>{`
        h3 {
          color: green;
        }
      `}</style>
      <Card style={{ width: '40rem' }}>
        <Card.Header>
          {' '}
          <h3 id="shopping-cart">Shopping Cart:</h3>
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
      {cartItems.length > 0 && (
        <Button
          id="checkout"
          as="input"
          type="button"
          value="Checkout"
          onClick={handleClick}
        />
      )}
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
