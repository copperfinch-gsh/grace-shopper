import React from 'react';
import { connect } from 'react-redux';
import { editCart, removeFromCart } from '../store/cart';
import CartProduct from './CartProduct';

const Cart = ({ cartItems, handleChange, deleteCartProduct }) => {
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
    deleteCartProduct: product => {
      dispatch(removeFromCart(product));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
