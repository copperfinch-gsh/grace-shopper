import React from 'react';

export const GenericProductForm = props => {
  const { price, handleChange, handleSubmit, products } = props;
  return (
    <div>
      <select name="selecteedName" onChange={handleChange}>
        {products.map(product => {
          return <option key={product.id}>{product.name}</option>;
        })}
      </select>
      <form onSubmit={handleSubmit}>
        <label htmlFor="price" />
        Enter New Price
        <label />
        <input type="text" name="price" value={price} onChange={handleChange} />
        <button id="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
