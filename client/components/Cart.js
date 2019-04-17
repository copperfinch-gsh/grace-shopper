import React from 'react';
import { connect } from 'react-redux';
import { updateCart } from '../store/cart';

const Cart = ({ cartItems, handleChange }) => {
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
          <div key={item.id}>
            <div>
              {' '}
              <img src={item.imageUrl} alt="item image" />{' '}
            </div>
            <div> name: {item.name} </div>
            <div> price: {item.price} </div>
            <div>
              {' '}
              <select onChange={() => handleChange(item)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
                  return (
                    <option
                      key={number}
                      value={number}
                      selected={
                        item.desiredQuantity &&
                        number === Number(item.desiredQuantity)
                          ? 'selected'
                          : ''
                      }
                    >
                      {number}
                    </option>
                  );
                })}
              </select>{' '}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  cartItems: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    editCar: product => {
      dispatch(updateCart(product));
    },
    handleChange: (event, product) => {
      const value = event.target.value;
      dispatch(
        updateCart({
          product,
          desiredQuantity: value
        })
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
