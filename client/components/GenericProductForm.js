import React from 'react';
import { CartProduct } from '../components';

export const GenericProductForm = props => {
  const { item, handleChange, handleSubmit, deleteItem, price } = props;
  return (
    <div>
      <CartProduct
        item={item}
        fullQuantity={item.quantity}
        deleteItem={deleteItem}
        admin={true}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="price" />
        <h4 id="title-color">Enter New Price</h4>
        <label />
        <input type="text" name="price" onChange={handleChange} value={price} />
        <button id="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
