import React from 'react';
import { CartProduct } from '../components';
import Card from 'react-bootstrap/Card';

export const GenericProductForm = props => {
  const { item, handleChange, handleSubmit } = props;
  console.log('genericproduct', item.price);
  return (
    <div>
      <CartProduct item={item} fullQuantity={item.quantity} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="price" />
        <h4 id="title-color">Enter New Price</h4>
        <label />
        <input type="text" name="price" onChange={handleChange} />
        <button id="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
