import React from 'react';
import { connect } from 'react-redux';
import { editCart, submitCartThunk, removeFromCart } from '../store/cart';
import CartProduct from './CartProduct';
import { Button } from 'react-bootstrap';

const Cart = ({ cartItems, handleChange, handleClick, deleteCartProduct }) => {
  return (
    <div className="container-fluid">
      <style jsx>{`
        h3 {
          color: green;
        }
      `}</style>
      <h3>Shopping Cart:</h3>
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
      {cartItems.length > 0 && (
        <Button
          id="checkout"
          as="input"
          type="button"
          value="Checkout"
          onClick={() => handleClick(cartItems)}
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
        editCart({
          product,
          desiredQuantity: value
        })
      );
    },
    handleClick: cartItems => {
      dispatch(submitCartThunk({ items: cartItems }));
    },
    deleteCartProduct: product => {
      dispatch(removeFromCart(product));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
