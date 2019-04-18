import React from 'react';

const CartProduct = ({ item, handleChange }) => {
  return (
    <div>
      <div>
        {' '}
        <img src={item.imageUrl} alt="item image" />{' '}
      </div>
      <div> name: {item.name} </div>
      <div> price: ${item.price * item.desiredQuantity / 100} </div>
      <div>
        {' '}
        <select onChange={event => handleChange(event, item)}>
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
};

export default CartProduct;
